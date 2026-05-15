import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const envPaths = [
  join(/* turbopackIgnore: true */ process.cwd(), ".env"),
  join(/* turbopackIgnore: true */ process.cwd(), "..", ".env"),
];

function stripQuotes(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function loadEnv() {
  for (const envPath of envPaths) {
    if (!existsSync(envPath)) {
      continue;
    }

    const entries = readFileSync(envPath, "utf8").split(/\r?\n/);

    for (const entry of entries) {
      const line = entry.trim();

      if (!line || line.startsWith("#")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");

      if (separatorIndex === -1) {
        continue;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = stripQuotes(line.slice(separatorIndex + 1));

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  }
}

export function getDatabaseUrl() {
  loadEnv();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env before using the database.");
  }

  return process.env.DATABASE_URL;
}
