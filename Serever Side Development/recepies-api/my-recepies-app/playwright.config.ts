import { defineConfig, devices } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";

loadEnvFile(".env");
loadEnvFile(".env.test");

const port = 3200;
const host = "localhost";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://${host}:${port}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://${host}:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      DATABASE_URL: process.env.TEST_DATABASE_URL ?? "",
      JWT_SECRET: process.env.JWT_SECRET ?? "e2e-test-secret",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

function loadEnvFile(path: string) {
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
