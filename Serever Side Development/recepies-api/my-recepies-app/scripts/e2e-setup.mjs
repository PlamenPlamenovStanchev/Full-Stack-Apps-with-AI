import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

function loadEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    if (!match || match[0].trim().startsWith("#")) {
      continue;
    }

    const [, key, rawValue = ""] = match;
    process.env[key] ??= rawValue.replace(/^['"]|['"]$/g, "");
  }
}

loadEnvFile(".env");
loadEnvFile(".env.test");

if (!process.env.TEST_DATABASE_URL) {
  throw new Error("TEST_DATABASE_URL is required for Playwright E2E tests.");
}

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

execFileSync(npxCommand, ["drizzle-kit", "migrate"], {
  env: {
    ...process.env,
    DATABASE_URL: process.env.TEST_DATABASE_URL,
  },
  stdio: "inherit",
});
