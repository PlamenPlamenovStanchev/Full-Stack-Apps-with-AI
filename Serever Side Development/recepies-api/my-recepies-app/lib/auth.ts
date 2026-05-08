import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
export {
  hashPassword,
  signAuthToken,
  verifyAuthToken,
  verifyPassword,
  type CurrentUser,
} from "@/lib/auth-core";
import { verifyAuthToken } from "@/lib/auth-core";

export const AUTH_COOKIE_NAME = "recipe_auth_token";

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim();
}

export async function getCurrentUser(request: NextRequest) {
  const token =
    getBearerToken(request) ?? (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    return null;
  }

  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      email: true,
      name: true,
    },
    where: eq(users.id, payload.sub),
  });

  return user ?? null;
}
