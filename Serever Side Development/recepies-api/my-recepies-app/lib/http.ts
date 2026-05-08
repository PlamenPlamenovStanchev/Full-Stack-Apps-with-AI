import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export function jsonResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function errorResponse(
  message: string,
  status: number,
  code: ApiErrorCode,
) {
  return NextResponse.json({ error: { code, message } }, { status });
}

export async function readJsonObject(request: Request) {
  try {
    const body = await request.json();
    return isRecord(body) ? body : null;
  } catch {
    return null;
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function requiredString(
  body: Record<string, unknown>,
  field: string,
) {
  const value = body[field];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function optionalString(
  body: Record<string, unknown>,
  field: string,
) {
  const value = body[field];

  if (value === undefined || value === null) {
    return undefined;
  }

  return typeof value === "string" ? value.trim() : null;
}

export function optionalPositiveInteger(
  body: Record<string, unknown>,
  field: string,
) {
  const value = body[field];

  if (value === undefined || value === null) {
    return undefined;
  }

  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isInteger(numberValue) && numberValue > 0 ? numberValue : null;
}

export function optionalTags(body: Record<string, unknown>) {
  const value = body.tags;

  if (value === undefined || value === null) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    return null;
  }

  const tags = value.map((tag) =>
    typeof tag === "string" ? tag.trim().toLowerCase() : null,
  );

  if (tags.some((tag) => !tag)) {
    return null;
  }

  return Array.from(new Set(tags as string[]));
}
