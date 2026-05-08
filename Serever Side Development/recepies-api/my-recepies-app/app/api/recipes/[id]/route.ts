import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
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

type RecipeContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RecipeContext) {
  const { id } = await context.params;
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, id),
    with: {
      user: {
        columns: {
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

export async function PUT(request: NextRequest, context: RecipeContext) {
  return updateRecipe(request, context, true);
}

export async function PATCH(request: NextRequest, context: RecipeContext) {
  return updateRecipe(request, context, false);
}

export async function DELETE(request: NextRequest, context: RecipeContext) {
  const user = await getCurrentUser(request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  const { id } = await context.params;
  const recipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      photoUrl: true,
      userId: true,
    },
    where: eq(recipes.id, id),
  });

  if (!recipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  if (recipe.userId !== user.id) {
    return errorResponse("You can only delete your own recipes.", 403, "FORBIDDEN");
  }

  await deleteRecipePhoto(recipe.photoUrl);
  await db.delete(recipes).where(eq(recipes.id, id));

  return Response.json({ message: "Recipe deleted." });
}

async function updateRecipe(
  request: NextRequest,
  context: RecipeContext,
  requireAllFields: boolean,
) {
  const user = await getCurrentUser(request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const { id } = await context.params;
  const existingRecipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      userId: true,
    },
    where: eq(recipes.id, id),
  });

  if (!existingRecipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  if (existingRecipe.userId !== user.id) {
    return errorResponse("You can only update your own recipes.", 403, "FORBIDDEN");
  }

  const title = optionalString(body, "title");
  const description = optionalString(body, "description");
  const ingredients = optionalString(body, "ingredients");
  const instructions = optionalString(body, "instructions");
  const cookingTime = optionalPositiveInteger(body, "cookingTime");
  const servings = optionalPositiveInteger(body, "servings");
  const tags = optionalTags(body);

  if (
    title === null ||
    description === null ||
    ingredients === null ||
    instructions === null ||
    cookingTime === null ||
    servings === null ||
    tags === null
  ) {
    return errorResponse("One or more fields are invalid.", 400, "BAD_REQUEST");
  }

  if (
    requireAllFields &&
    (!title ||
      !description ||
      !ingredients ||
      !instructions ||
      cookingTime === undefined ||
      servings === undefined ||
      tags === undefined)
  ) {
    return errorResponse(
      "Title, description, ingredients, instructions, cookingTime, servings, and tags are required.",
      400,
      "BAD_REQUEST",
    );
  }

  const updates = {
    ...(title !== undefined ? { title } : {}),
    ...(description !== undefined ? { description } : {}),
    ...(ingredients !== undefined ? { ingredients } : {}),
    ...(instructions !== undefined ? { instructions } : {}),
    ...(cookingTime !== undefined ? { cookingTime } : {}),
    ...(servings !== undefined ? { servings } : {}),
    ...(tags !== undefined ? { tags } : {}),
  };

  if (Object.keys(updates).length === 0) {
    return errorResponse("At least one recipe field is required.", 400, "BAD_REQUEST");
  }

  const [recipe] = await db
    .update(recipes)
    .set(updates)
    .where(eq(recipes.id, id))
    .returning();

  return Response.json({ recipe: serializeRecipe(recipe) });
}
