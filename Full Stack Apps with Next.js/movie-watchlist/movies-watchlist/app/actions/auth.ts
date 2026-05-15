"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth";

export type AuthActionState = {
  message: string;
};

function readRequiredString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(email: string) {
  return email.toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function registerUser(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = readRequiredString(formData, "name");
  const email = normalizeEmail(readRequiredString(formData, "email"));
  const password = readRequiredString(formData, "password");

  if (!name || !email || !password) {
    return { message: "Name, email, and password are required." };
  }

  if (!isValidEmail(email)) {
    return { message: "Enter a valid email address." };
  }

  if (password.length < 6) {
    return { message: "Password must be at least 6 characters." };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { message: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [createdUser] = await db
    .insert(users)
    .values({
      email,
      name,
      passwordHash,
      role: "user",
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    });

  await setSessionCookie(createdUser);
  redirect("/profile");
}

export async function loginUser(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = normalizeEmail(readRequiredString(formData, "email"));
  const password = readRequiredString(formData, "password");

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return { message: "Invalid email or password." };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return { message: "Invalid email or password." };
  }

  await setSessionCookie({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  redirect("/profile");
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/");
}
