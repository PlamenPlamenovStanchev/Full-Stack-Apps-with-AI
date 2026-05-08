import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/http";
import { deleteRecipePhoto, uploadRecipePhoto } from "@/lib/r2";

export const runtime = "nodejs";

type RecipePhotoContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: RecipePhotoContext) {
  const user = await getCurrentUser(request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  const { id } = await context.params;
  const recipe = await findOwnedRecipe(id, user.id);

  if (!recipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  const formData = await request.formData();
  const photo = formData.get("photo");

  if (!(photo instanceof File)) {
    return errorResponse("A photo file is required.", 400, "BAD_REQUEST");
  }

  try {
    const uploaded = await uploadRecipePhoto(id, photo);
    await deleteRecipePhoto(recipe.photoUrl);

    const [updatedRecipe] = await db
      .update(recipes)
      .set({ photoUrl: uploaded.url })
      .where(eq(recipes.id, id))
      .returning({ photoUrl: recipes.photoUrl });

    return Response.json({ photoUrl: updatedRecipe.photoUrl });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Could not upload photo.",
      400,
      "BAD_REQUEST",
    );
  }
}

export async function DELETE(_request: NextRequest, context: RecipePhotoContext) {
  const user = await getCurrentUser(_request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  const { id } = await context.params;
  const recipe = await findOwnedRecipe(id, user.id);

  if (!recipe) {
    return errorResponse("Recipe not found.", 404, "NOT_FOUND");
  }

  await deleteRecipePhoto(recipe.photoUrl);
  await db.update(recipes).set({ photoUrl: null }).where(eq(recipes.id, id));

  return Response.json({ photoUrl: null });
}

async function findOwnedRecipe(id: string, userId: string) {
  const recipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      userId: true,
      photoUrl: true,
    },
    where: eq(recipes.id, id),
  });

  if (!recipe || recipe.userId !== userId) {
    return null;
  }

  return recipe;
}
