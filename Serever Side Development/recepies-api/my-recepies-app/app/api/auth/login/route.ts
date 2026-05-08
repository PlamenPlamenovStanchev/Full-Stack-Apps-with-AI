import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  signAuthToken,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { errorResponse, readJsonObject, requiredString } from "@/lib/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const email = requiredString(body, "email")?.toLowerCase();
  const password = requiredString(body, "password");

  if (!email || !password) {
    return errorResponse("Email and password are required.", 400, "BAD_REQUEST");
  }

  const userWithPassword = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (
    !userWithPassword ||
    !(await verifyPassword(password, userWithPassword.password))
  ) {
    return errorResponse("Invalid email or password.", 401, "UNAUTHORIZED");
  }

  const user = {
    id: userWithPassword.id,
    email: userWithPassword.email,
    name: userWithPassword.name,
  };
  const token = signAuthToken(user);
  const response = NextResponse.json({ user, token });
  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return response;
}
