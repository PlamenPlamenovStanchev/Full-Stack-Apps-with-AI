import { desc } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { recipes } from "@/db/schema";
import { getAdminUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/http";
import { serializeRecipe } from "@/lib/recipes";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const rows = await db.query.recipes.findMany({
    orderBy: [desc(recipes.dateCreated)],
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

  return Response.json({ recipes: rows.map(serializeRecipe) });
}
