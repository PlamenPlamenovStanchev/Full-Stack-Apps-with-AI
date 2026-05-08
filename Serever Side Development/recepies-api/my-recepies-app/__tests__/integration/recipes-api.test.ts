import bcrypt from "bcrypt";
import { execFileSync, spawn, type ChildProcess } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import pg from "pg";

const { Pool } = pg;

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

type SeedState = {
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
  recipe: {
    id: string;
    title: string;
  };
};

let pool: pg.Pool;
let server: ChildProcess;
let seed: SeedState;

beforeAll(async () => {
  loadEnvFile(".env");
  loadEnvFile(".env.test");

  if (!process.env.TEST_DATABASE_URL) {
    throw new Error("TEST_DATABASE_URL is required for integration tests.");
  }

  process.env.JWT_SECRET ??= "integration-test-secret";
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

  runDrizzleMigrations();
  pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
  server = await startNextServer();
});

beforeEach(async () => {
  seed = await resetAndSeedDatabase();
});

afterAll(async () => {
  await pool?.end();
  await stopNextServer(server);
});

describe("Recipes System API integration", () => {
  it("supports register, login, and me over real HTTP", async () => {
    const registerResponse = await postJson("/api/auth/register", {
      email: "new.user@example.com",
      password: "password123",
      name: "New User",
    });
    const registered = await registerResponse.json();

    expect(registerResponse.status).toBe(201);
    expect(registered.user).toMatchObject({
      email: "new.user@example.com",
      name: "New User",
    });
    expect(typeof registered.token).toBe("string");

    const loginResponse = await postJson("/api/auth/login", {
      email: seed.owner.email,
      password: seed.owner.password,
    });
    const loggedIn = await loginResponse.json();

    expect(loginResponse.status).toBe(200);
    expect(loggedIn.user).toMatchObject({ email: seed.owner.email });

    const meResponse = await fetch(`${baseUrl}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${loggedIn.token}`,
      },
    });
    const me = await meResponse.json();

    expect(meResponse.status).toBe(200);
    expect(me.user).toMatchObject({ id: seed.owner.id, email: seed.owner.email });
  });

  it("lists and views recipes", async () => {
    const listResponse = await fetch(`${baseUrl}/api/recipes?page=1&pageSize=10`);
    const list = await listResponse.json();

    expect(listResponse.status).toBe(200);
    expect(list.data).toHaveLength(1);
    expect(list.data[0]).toMatchObject({
      id: seed.recipe.id,
      title: seed.recipe.title,
      userId: seed.owner.id,
    });
    expect(list.pagination.total).toBe(1);

    const viewResponse = await fetch(`${baseUrl}/api/recipes/${seed.recipe.id}`);
    const view = await viewResponse.json();

    expect(viewResponse.status).toBe(200);
    expect(view.recipe).toMatchObject({
      id: seed.recipe.id,
      title: seed.recipe.title,
      user: {
        id: seed.owner.id,
      },
    });
  });

  it("allows an authenticated user to create, edit, and delete recipes", async () => {
    const token = await loginForToken(seed.owner.email, seed.owner.password);

    const createResponse = await postJson(
      "/api/recipes",
      recipePayload({ title: "Integration Pasta" }),
      token,
    );
    const created = await createResponse.json();

    expect(createResponse.status).toBe(201);
    expect(created.recipe).toMatchObject({
      title: "Integration Pasta",
      userId: seed.owner.id,
    });

    const updateResponse = await fetch(
      `${baseUrl}/api/recipes/${created.recipe.id}`,
      {
        method: "PUT",
        headers: authJsonHeaders(token),
        body: JSON.stringify(
          recipePayload({
            title: "Updated Integration Pasta",
            cookingTime: 25,
          }),
        ),
      },
    );
    const updated = await updateResponse.json();

    expect(updateResponse.status).toBe(200);
    expect(updated.recipe).toMatchObject({
      title: "Updated Integration Pasta",
      cookingTime: 25,
    });

    const patchResponse = await fetch(`${baseUrl}/api/recipes/${created.recipe.id}`, {
      method: "PATCH",
      headers: authJsonHeaders(token),
      body: JSON.stringify({ description: "Patched description" }),
    });
    const patched = await patchResponse.json();

    expect(patchResponse.status).toBe(200);
    expect(patched.recipe.description).toBe("Patched description");

    const deleteResponse = await fetch(
      `${baseUrl}/api/recipes/${created.recipe.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    expect(deleteResponse.status).toBe(200);

    const deletedViewResponse = await fetch(
      `${baseUrl}/api/recipes/${created.recipe.id}`,
    );
    expect(deletedViewResponse.status).toBe(404);
  });

  it("enforces anonymous access control for protected recipe endpoints", async () => {
    const createResponse = await postJson("/api/recipes", recipePayload());
    expect(createResponse.status).toBe(401);

    const updateResponse = await fetch(`${baseUrl}/api/recipes/${seed.recipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipePayload({ title: "Anonymous Edit" })),
    });
    expect(updateResponse.status).toBe(401);

    const deleteResponse = await fetch(`${baseUrl}/api/recipes/${seed.recipe.id}`, {
      method: "DELETE",
    });
    expect(deleteResponse.status).toBe(401);
  });

  it("forbids non-owners from editing or deleting another user's recipe", async () => {
    const otherToken = await loginForToken(
      seed.otherUser.email,
      seed.otherUser.password,
    );

    const updateResponse = await fetch(`${baseUrl}/api/recipes/${seed.recipe.id}`, {
      method: "PUT",
      headers: authJsonHeaders(otherToken),
      body: JSON.stringify(recipePayload({ title: "Stolen Recipe" })),
    });
    expect(updateResponse.status).toBe(403);

    const deleteResponse = await fetch(`${baseUrl}/api/recipes/${seed.recipe.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${otherToken}`,
      },
    });
    expect(deleteResponse.status).toBe(403);
  });
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

function runDrizzleMigrations() {
  execFileSync(npxCommand, ["drizzle-kit", "migrate"], {
    env: {
      ...process.env,
      DATABASE_URL: process.env.TEST_DATABASE_URL,
    },
    stdio: "inherit",
  });
}

async function startNextServer() {
  const child = spawn(npmCommand, ["run", "dev", "--", "--port", String(port)], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: process.env.TEST_DATABASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    },
    stdio: "ignore",
    windowsHide: true,
  });

  await waitForServer(child);
  return child;
}

async function waitForServer(child: ChildProcess) {
  const startedAt = Date.now();
  let lastError: unknown;

  while (Date.now() - startedAt < 60000) {
    if (child.exitCode !== null) {
      throw new Error(`Next test server exited with code ${child.exitCode}`);
    }

    try {
      const response = await fetch(`${baseUrl}/docs`);

      if (response.ok) {
        return;
      }
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  throw new Error(`Next test server did not start. Last error: ${lastError}`);
}

async function stopNextServer(child?: ChildProcess) {
  if (!child?.pid || child.exitCode !== null) {
    return;
  }

  if (process.platform === "win32") {
    execFileSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
    });
    return;
  }

  child.kill("SIGTERM");
}

async function resetAndSeedDatabase(): Promise<SeedState> {
  await pool.query("TRUNCATE TABLE recipes, users RESTART IDENTITY CASCADE");

  const ownerPassword = "password123";
  const otherPassword = "password123";
  const ownerHash = await bcrypt.hash(ownerPassword, 10);
  const otherHash = await bcrypt.hash(otherPassword, 10);

  const ownerResult = await pool.query<{ id: string }>(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
    ["owner@example.com", ownerHash, "Owner User"],
  );
  const otherResult = await pool.query<{ id: string }>(
    "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
    ["other@example.com", otherHash, "Other User"],
  );
  const recipeResult = await pool.query<{ id: string }>(
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
      "Seeded Test Soup",
      "A reliable integration test recipe.",
      "water, carrots, salt",
      "Simmer everything until tender.",
      30,
      4,
      ["soup", "test"],
      ownerResult.rows[0].id,
    ],
  );

  return {
    owner: {
      id: ownerResult.rows[0].id,
      email: "owner@example.com",
      password: ownerPassword,
    },
    otherUser: {
      id: otherResult.rows[0].id,
      email: "other@example.com",
      password: otherPassword,
    },
    recipe: {
      id: recipeResult.rows[0].id,
      title: "Seeded Test Soup",
    },
  };
}

async function postJson(path: string, body: unknown, token?: string) {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: token ? authJsonHeaders(token) : { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function authJsonHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function loginForToken(email: string, password: string) {
  const response = await postJson("/api/auth/login", { email, password });
  const body = await response.json();

  if (!response.ok || typeof body.token !== "string") {
    throw new Error("Could not login test user.");
  }

  return body.token as string;
}

function recipePayload(overrides: Partial<Record<string, unknown>> = {}) {
  return {
    title: "Test Recipe",
    description: "A recipe created by integration tests.",
    ingredients: "flour, water, salt",
    instructions: "Mix and cook.",
    cookingTime: 20,
    servings: 2,
    tags: ["test", "quick"],
    ...overrides,
  };
}
