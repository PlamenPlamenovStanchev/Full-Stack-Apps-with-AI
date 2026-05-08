import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { errorResponse, jsonResponse } from "@/lib/http";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return errorResponse("Authentication required.", 401, "UNAUTHORIZED");
  }

  return jsonResponse({ user });
}
