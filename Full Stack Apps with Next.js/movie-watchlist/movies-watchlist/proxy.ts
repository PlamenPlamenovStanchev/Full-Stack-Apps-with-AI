import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session-token";

const USER_ROUTE_PREFIXES = ["/dashboard"];
const USER_ROUTES = ["/profile"];
const ADMIN_ROUTE_PREFIXES = ["/admin"];

function isProtectedUserRoute(pathname: string) {
  return (
    USER_ROUTES.includes(pathname) ||
    USER_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))
  );
}

function isProtectedAdminRoute(pathname: string) {
  return ADMIN_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedUserRoute(pathname) && !isProtectedAdminRoute(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await verifySessionToken(token);

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedAdminRoute(pathname) && user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/admin", "/admin/:path*"],
};
