export const SESSION_COOKIE_NAME = "movie_watchlist_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
};

type SessionPayload = SessionUser & {
  exp: number;
  iat: number;
  sub: string;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set. Add it to .env before using auth.");
  }

  return process.env.JWT_SECRET;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function encodeBase64Url(value: string) {
  return bytesToBase64Url(encoder.encode(value));
}

function decodeBase64UrlJson<T>(value: string): T {
  return JSON.parse(decoder.decode(base64UrlToBytes(value))) as T;
}

async function getSigningKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getJwtSecret()),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign", "verify"],
  );
}

async function sign(data: string) {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));

  return bytesToBase64Url(new Uint8Array(signature));
}

async function isValidSignature(data: string, signature: string) {
  try {
    const key = await getSigningKey();

    return crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signature),
      encoder.encode(data),
    );
  } catch {
    return false;
  }
}

function isValidRole(role: unknown): role is SessionUser["role"] {
  return role === "user" || role === "admin";
}

export async function createSessionToken(user: SessionUser) {
  const now = Math.floor(Date.now() / 1000);
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = encodeBase64Url(
    JSON.stringify({
      ...user,
      exp: now + SESSION_MAX_AGE_SECONDS,
      iat: now,
      sub: String(user.id),
    } satisfies SessionPayload),
  );
  const data = `${header}.${payload}`;

  return `${data}.${await sign(data)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;

  try {
    const header = decodeBase64UrlJson<{ alg?: string; typ?: string }>(encodedHeader);

    if (header.alg !== "HS256" || header.typ !== "JWT") {
      return null;
    }

    if (!(await isValidSignature(data, signature))) {
      return null;
    }

    const payload = decodeBase64UrlJson<Partial<SessionPayload>>(encodedPayload);
    const now = Math.floor(Date.now() / 1000);

    if (
      typeof payload.id !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      !isValidRole(payload.role) ||
      typeof payload.exp !== "number" ||
      payload.exp <= now
    ) {
      return null;
    }

    return {
      email: payload.email,
      id: payload.id,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
