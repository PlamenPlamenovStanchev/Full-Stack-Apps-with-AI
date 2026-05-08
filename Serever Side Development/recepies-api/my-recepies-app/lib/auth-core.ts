import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return secret;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAuthToken(user: CurrentUser) {
  return jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    },
    getJwtSecret(),
    {
      expiresIn: "7d",
      subject: user.id,
    },
  );
}

export function verifyAuthToken(token: string) {
  const payload = jwt.verify(token, getJwtSecret());

  if (
    typeof payload !== "object" ||
    typeof payload.sub !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.isAdmin !== "boolean" ||
    typeof payload.name !== "string"
  ) {
    return null;
  }

  return payload as JwtPayload & jwt.JwtPayload;
}
