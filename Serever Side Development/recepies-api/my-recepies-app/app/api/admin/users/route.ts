import { asc } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { users } from "@/db/schema";
import { getAdminUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse } from "@/lib/http";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);

  if (!admin) {
    return errorResponse("Admin access required.", 403, "FORBIDDEN");
  }

  const rows = await db.query.users.findMany({
    columns: {
      createdAt: true,
      email: true,
      id: true,
      isAdmin: true,
      name: true,
    },
    orderBy: [asc(users.email)],
  });

  return Response.json({
    users: rows.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
    })),
  });
}
