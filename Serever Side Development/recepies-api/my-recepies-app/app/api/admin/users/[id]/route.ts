import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes, users } from "@/db/schema";
import { getAdminUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse, readJsonObject, requiredString } from "@/lib/http";
import { deleteRecipePhoto } from "@/lib/r2";

export const runtime = "nodejs";

type AdminUserContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: AdminUserContext) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const name = requiredString(body, "name");
  const isAdmin = body.isAdmin;

  if (!name || typeof isAdmin !== "boolean") {
    return errorResponse("Name and isAdmin are required.", 400, "BAD_REQUEST");
  }

  const { id } = await context.params;
  const existingUser = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.id, id),
  });

  if (!existingUser) {
    return errorResponse("User not found.", 404, "NOT_FOUND");
  }

  if (id === admin.id && !isAdmin) {
    return errorResponse("You cannot remove your own admin access.", 400, "BAD_REQUEST");
  }

  const [user] = await db
    .update(users)
    .set({ isAdmin, name })
    .where(eq(users.id, id))
    .returning({
      createdAt: users.createdAt,
      email: users.email,
      id: users.id,
      isAdmin: users.isAdmin,
      name: users.name,
    });

  return Response.json({
    user: {
      ...user,
      createdAt: user.createdAt.toISOString(),
    },
  });
}

export async function DELETE(request: NextRequest, context: AdminUserContext) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const { id } = await context.params;

  if (id === admin.id) {
    return errorResponse("You cannot delete your own user.", 400, "BAD_REQUEST");
  }

  const existingUser = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.id, id),
  });

  if (!existingUser) {
    return errorResponse("User not found.", 404, "NOT_FOUND");
  }

  const userRecipes = await db.query.recipes.findMany({
    columns: { photoUrl: true },
    where: eq(recipes.userId, id),
  });

  await Promise.all(
    userRecipes.map((recipe) => deleteRecipePhoto(recipe.photoUrl)),
  );
  await db.delete(users).where(eq(users.id, id));

  return Response.json({ message: "User deleted." });
}
