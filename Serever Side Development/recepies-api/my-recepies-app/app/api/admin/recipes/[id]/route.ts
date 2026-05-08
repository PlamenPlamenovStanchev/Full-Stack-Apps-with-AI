import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes } from "@/db/schema";
import { getAdminUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  errorResponse,
  optionalPositiveInteger,
  optionalString,
  optionalTags,
  readJsonObject,
} from "@/lib/http";
import { serializeRecipe } from "@/lib/recipes";
import { deleteRecipePhoto } from "@/lib/r2";

export const runtime = "nodejs";

type AdminRecipeContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: AdminRecipeContext) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const { id } = await context.params;
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: {
      user: {
        columns: {
          email: true,
          id: true,
          name: true,
        },
      },
    },
  });

  if (!recipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  return Response.json({ recipe: serializeRecipe(recipe) });
}

export async function PUT(request: NextRequest, context: AdminRecipeContext) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const { id } = await context.params;
  const existingRecipe = await db.query.recipes.findFirst({
    columns: { id: true },
    where: eq(recipes.id, id),
  });

  if (!existingRecipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  const title = optionalString(body, "title");
  const description = optionalString(body, "description");
  const ingredients = optionalString(body, "ingredients");
  const instructions = optionalString(body, "instructions");
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
    tags === null ||
    tags === undefined
  ) {
    return errorResponse(
      "Title, description, ingredients, instructions, cookingTime, servings, and tags are required.",
      400,
      "BAD_REQUEST",
    );
  }

  const [recipe] = await db
    .update(recipes)
    .set({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      tags,
    })
    .where(eq(recipes.id, id))
    .returning();

  return Response.json({ recipe: serializeRecipe(recipe) });
}

export async function DELETE(request: NextRequest, context: AdminRecipeContext) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const { id } = await context.params;
  const recipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      photoUrl: true,
    },
    where: eq(recipes.id, id),
  });

  if (!recipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  await deleteRecipePhoto(recipe.photoUrl);
  await db.delete(recipes).where(eq(recipes.id, id));

  return Response.json({ message: "Recipe deleted." });
}
