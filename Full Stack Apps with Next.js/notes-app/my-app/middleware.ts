import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";
const TOKEN_NAME = "auth_token";

// Routes that don't require authentication
const publicRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get(TOKEN_NAME)?.value;

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    // Verify token
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Invalid token - redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|public|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)"],
};
