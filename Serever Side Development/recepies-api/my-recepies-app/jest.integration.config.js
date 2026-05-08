const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/integration/**/*.test.ts"],
  testTimeout: 120000,
};

module.exports = createJestConfig(customJestConfig);
