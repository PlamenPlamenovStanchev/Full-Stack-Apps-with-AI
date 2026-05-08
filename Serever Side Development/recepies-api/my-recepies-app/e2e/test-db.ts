import bcrypt from "bcrypt";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import pg from "pg";

const { Pool } = pg;
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

export type E2ESeedState = {
  owner: {
    id: string;
    email: string;
    password: string;
  };
  otherUser: {
    id: string;
    email: string;
    password: string;
  };
  recipes: Array<{
    id: string;
    title: string;
    ownerId: string;
  }>;
};

export function loadEnvFile(path: string) {
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

export function prepareE2EEnvironment() {
  loadEnvFile(".env");
  loadEnvFile(".env.test");

  if (!process.env.TEST_DATABASE_URL) {
    throw new Error("TEST_DATABASE_URL is required for Playwright E2E tests.");
  }

  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  process.env.JWT_SECRET ??= "e2e-test-secret";
}

export function runE2EMigrations() {
  prepareE2EEnvironment();
  execFileSync(npxCommand, ["drizzle-kit", "migrate"], {
    env: {
      ...process.env,
      DATABASE_URL: process.env.TEST_DATABASE_URL,
    },
    stdio: "inherit",
  });
}

export async function resetAndSeedE2EDatabase() {
  prepareE2EEnvironment();

  const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });

  try {
    await pool.query("TRUNCATE TABLE recipes, users RESTART IDENTITY CASCADE");

    const owner = await insertUser(pool, {
      email: "owner.e2e@example.com",
      name: "Owner E2E",
      password: "password123",
    });
    const otherUser = await insertUser(pool, {
      email: "other.e2e@example.com",
      name: "Other E2E",
      password: "password123",
    });
    const recipes = [
      await insertRecipe(pool, {
        title: "E2E Tomato Pasta",
        description: "Bright pasta for browser tests.",
        ingredients: "pasta, tomatoes, basil",
        instructions: "Boil pasta and toss with sauce.",
        cookingTime: 20,
        servings: 2,
        tags: ["pasta", "quick"],
        userId: owner.id,
      }),
      await insertRecipe(pool, {
        title: "E2E Lentil Soup",
        description: "Simple soup for browser tests.",
        ingredients: "lentils, carrots, stock",
        instructions: "Simmer until tender.",
        cookingTime: 35,
        servings: 4,
        tags: ["soup", "vegetarian"],
        userId: owner.id,
      }),
      await insertRecipe(pool, {
        title: "E2E Berry Oats",
        description: "Breakfast oats for browser tests.",
        ingredients: "oats, berries, milk",
        instructions: "Cook oats and top with berries.",
        cookingTime: 10,
        servings: 1,
        tags: ["breakfast", "quick"],
        userId: otherUser.id,
      }),
    ];

    return {
      owner: {
        id: owner.id,
        email: owner.email,
        password: owner.password,
      },
      otherUser: {
        id: otherUser.id,
        email: otherUser.email,
        password: otherUser.password,
      },
      recipes,
    } satisfies E2ESeedState;
  } finally {
    await pool.end();
  }
}

async function insertUser(
  pool: pg.Pool,
  user: { email: string; name: string; password: string },
) {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const result = await pool.query<{ id: string }>(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
    [user.email, passwordHash, user.name],
  );

  return {
    id: result.rows[0].id,
    ...user,
  };
}

async function insertRecipe(
  pool: pg.Pool,
  recipe: {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    cookingTime: number;
    servings: number;
    tags: string[];
    userId: string;
  },
) {
  const result = await pool.query<{ id: string }>(
    `INSERT INTO recipes (
      title,
      description,
      ingredients,
      instructions,
      cooking_time,
      servings,
      tags,
      user_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
    [
      recipe.title,
      recipe.description,
      recipe.ingredients,
      recipe.instructions,
      recipe.cookingTime,
      recipe.servings,
      recipe.tags,
      recipe.userId,
    ],
  );

  return {
    id: result.rows[0].id,
    title: recipe.title,
    ownerId: recipe.userId,
  };
}
