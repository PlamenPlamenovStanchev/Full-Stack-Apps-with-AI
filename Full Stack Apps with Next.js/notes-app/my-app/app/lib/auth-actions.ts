"use server";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as schema from "@/db/schema";
import { getDb } from "@/app/lib/db";
import {
  createToken,
  setAuthCookie,
  clearAuthCookie,
  getCurrentUser,
} from "@/app/lib/auth";

export async function registerUser(
  email: string,
  password: string,
  confirmPassword: string
) {
  // Validation
  if (!email || !password || !confirmPassword) {
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const db = getDb();

  // Check if user already exists
  const existingUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const newUser = await db
    .insert(schema.users)
    .values({
      email,
      passwordHash,
    })
    .returning();

  if (!newUser[0]) {
    throw new Error("Failed to create user");
  }

  // Create JWT token
  const token = await createToken({
    userId: newUser[0].id,
    email: newUser[0].email,
  });

  // Set cookie
  await setAuthCookie(token);

  // Redirect to home
  revalidatePath("/");
  redirect("/");
}

export async function loginUser(email: string, password: string) {
  // Validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const db = getDb();

  // Find user
  const users = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (users.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = users[0];

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Create JWT token
  const token = await createToken({
    userId: user.id,
    email: user.email,
  });

  // Set cookie
  await setAuthCookie(token);

  // Redirect to home
  revalidatePath("/");
  redirect("/");
}

export async function logoutUser() {
  // Clear auth cookie
  await clearAuthCookie();

  // Redirect to login
  revalidatePath("/");
  redirect("/auth/login");
}
