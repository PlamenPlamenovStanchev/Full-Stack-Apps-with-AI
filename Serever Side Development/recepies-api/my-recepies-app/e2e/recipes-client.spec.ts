import { expect, test, type Page } from "@playwright/test";
import { resetAndSeedE2EDatabase, type E2ESeedState } from "./test-db";

let seed: E2ESeedState;

test.beforeEach(async ({ page }) => {
  seed = await resetAndSeedE2EDatabase();
  page.on("dialog", (dialog) => dialog.accept());
});

test("home page renders the expected number of posts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /find something/i })).toBeVisible();
  await expect(page.locator("article")).toHaveCount(3);
});

test("anonymous user browses recipes and views details", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "quick" }).click();
  await expect(page.locator("article")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "E2E Tomato Pasta" })).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/recipes\/.+/),
    page
      .locator("article")
      .filter({ hasText: "E2E Tomato Pasta" })
      .getByRole("link", { name: "View" })
      .click(),
  ]);

  await expect(
    page.getByRole("heading", { name: "E2E Tomato Pasta" }),
  ).toBeVisible();
  await expect(page.getByText("pasta, tomatoes, basil")).toBeVisible();
  await expect(page.getByText("Boil pasta and toss with sauce.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Edit" })).toHaveCount(0);
});

test("user registers, logs in, creates, edits, and deletes a recipe", async ({
  page,
}) => {
  await page.goto("/register");
  await page.getByLabel("Name").fill("Browser Cook");
  await page.getByLabel("Email").fill("browser.cook@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("Browser Cook")).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByLabel("Email").fill("browser.cook@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Browser Cook")).toBeVisible();

  await page.getByRole("link", { name: "My Recipes" }).click();
  await page.getByRole("link", { name: "New Recipe" }).click();
  await fillRecipeForm(page, {
    title: "Browser Test Risotto",
    description: "A creamy recipe created in Playwright.",
    cookingTime: "42",
    servings: "3",
    tags: "rice, dinner",
    ingredients: "rice, stock, parmesan",
    instructions: "Stir patiently until creamy.",
  });
  await page.getByRole("button", { name: "Create recipe" }).click();

  await expect(
    page.getByRole("heading", { name: "Browser Test Risotto" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Edit" })).toBeVisible();

  await page.getByRole("link", { name: "Edit" }).click();
  await page.getByLabel("Title").fill("Browser Test Risotto Updated");
  await page.getByLabel("Cooking time").fill("45");
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(
    page.getByRole("heading", { name: "Browser Test Risotto Updated" }),
  ).toBeVisible();
  await expect(page.getByText("45 minutes")).toBeVisible();

  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.getByRole("heading", { name: "My Recipes" })).toBeVisible();
  await expect(page.getByText("No recipes yet")).toBeVisible();
});

test("user cannot see the Edit button on another user's recipe", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(seed.otherUser.email);
  await page.getByLabel("Password").fill(seed.otherUser.password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Other E2E")).toBeVisible();
  await page.goto(`/recipes/${seed.recipes[0].id}`);

  await expect(
    page.getByRole("heading", { name: seed.recipes[0].title }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Edit" })).toHaveCount(0);
});

async function fillRecipeForm(
  page: Page,
  values: {
    title: string;
    description: string;
    cookingTime: string;
    servings: string;
    tags: string;
    ingredients: string;
    instructions: string;
  },
) {
  await page.getByLabel("Title").fill(values.title);
  await page.getByLabel("Description").fill(values.description);
  await page.getByLabel("Cooking time").fill(values.cookingTime);
  await page.getByLabel("Servings").fill(values.servings);
  await page.getByLabel("Tags").fill(values.tags);
  await page.getByLabel("Ingredients").fill(values.ingredients);
  await page.getByLabel("Instructions").fill(values.instructions);
}
