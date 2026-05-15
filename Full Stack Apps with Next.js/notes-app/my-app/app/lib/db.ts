import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  return drizzle({
    connection: process.env.DATABASE_URL,
    schema,
  });
}
