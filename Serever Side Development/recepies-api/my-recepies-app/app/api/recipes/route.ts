import { and, arrayContains, count, desc, ilike, or } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  errorResponse,
  optionalPositiveInteger,
  optionalTags,
  readJsonObject,
  requiredString,
} from "@/lib/http";
import { serializeRecipe } from "@/lib/recipes";

export const runtime = "nodejs";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parsePositiveInteger(searchParams.get("page"), DEFAULT_PAGE);
  const pageSize = Math.min(
    parsePositiveInteger(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );
  const tag = searchParams.get("tag")?.trim().toLowerCase();
  const search = searchParams.get("search")?.trim();
  const offset = (page - 1) * pageSize;

  const filters = [
    tag ? arrayContains(recipes.tags, [tag]) : undefined,
    search
      ? or(
          ilike(recipes.title, `%${search}%`),
          ilike(recipes.description, `%${search}%`),
          ilike(recipes.ingredients, `%${search}%`),
          ilike(recipes.instructions, `%${search}%`),
        )
      : undefined,
  ].filter(Boolean);
  const where = filters.length ? and(...filters) : undefined;

  const [rows, totalRows] = await Promise.all([
    db.query.recipes.findMany({
      where,
      orderBy: [desc(recipes.dateCreated)],
      limit: pageSize,
      offset,
      with: {
        user: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    }),
    db.select({ value: count() }).from(recipes).where(where),
  ]);

  const total = totalRows[0]?.value ?? 0;

  return Response.json({
    data: rows.map(serializeRecipe),
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const title = requiredString(body, "title");
  const description = requiredString(body, "description");
  const ingredients = requiredString(body, "ingredients");
  const instructions = requiredString(body, "instructions");
  const cookingTime = optionalPositiveInteger(body, "cookingTime");
  const servings = optionalPositiveInteger(body, "servings");
  const tags = optionalTags(body);

  if (
    !title ||
    !description ||
    !ingredients ||
    !instructions ||
    cookingTime === null ||
    cookingTime === undefined ||
    servings === null ||
    servings === undefined ||
    tags === null
  ) {
    return errorResponse(
      "Title, description, ingredients, instructions, cookingTime, servings, and tags are required.",
      400,
      "BAD_REQUEST",
    );
  }

  const [recipe] = await db
    .insert(recipes)
    .values({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      tags,
      userId: user.id,
    })
    .returning();

  return Response.json({ recipe: serializeRecipe(recipe) }, { status: 201 });
}

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
