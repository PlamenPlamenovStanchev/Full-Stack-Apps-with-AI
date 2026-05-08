const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  collectCoverageFrom: [
    "lib/auth-core.ts",
    "lib/validation.ts",
    "lib/client-api.ts",
    "!lib/db.ts",
    "!lib/r2.ts",
  ],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/integration/"],
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);
