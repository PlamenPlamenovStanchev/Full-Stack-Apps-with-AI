import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const TOKEN_NAME = "auth_token";

export interface AuthPayload {
  userId: string;
  email: string;
}

export async function createToken(payload: AuthPayload): Promise<string> {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value || null;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

export async function getCurrentUser(): Promise<AuthPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyToken(token);
}
