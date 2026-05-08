import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { users } from "@/db/schema";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  hashPassword,
  signAuthToken,
} from "@/lib/auth";
import { db } from "@/lib/db";
import {
  errorResponse,
  readJsonObject,
  requiredString,
} from "@/lib/http";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await readJsonObject(request);

  if (!body) {
    return errorResponse("Request body must be a JSON object.", 400, "BAD_REQUEST");
  }

  const email = requiredString(body, "email")?.toLowerCase();
  const password = requiredString(body, "password");
  const name = requiredString(body, "name");

  if (!email || !password || !name) {
    return errorResponse("Email, password, and name are required.", 400, "BAD_REQUEST");
  }

  if (password.length < 8) {
    return errorResponse("Password must be at least 8 characters.", 400, "BAD_REQUEST");
  }

  const existingUser = await db.query.users.findFirst({
    columns: { id: true },
    where: eq(users.email, email),
  });

  if (existingUser) {
    return errorResponse("A user with that email already exists.", 409, "CONFLICT");
  }

  const [user] = await db
    .insert(users)
    .values({
      email,
      name,
      password: await hashPassword(password),
    })
    .returning({
      id: users.id,
      email: users.email,
      isAdmin: users.isAdmin,
      name: users.name,
    });

  const token = signAuthToken(user);
  const response = NextResponse.json({ user, token }, { status: 201 });
  response.cookies.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

  return response;
}
