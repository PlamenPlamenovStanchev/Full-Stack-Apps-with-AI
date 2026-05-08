import bcrypt from "bcrypt";
import { existsSync, readFileSync } from "node:fs";
import pg from "pg";

const { Client } = pg;

function loadEnvFile() {
  if (!existsSync(".env")) {
    return;
  }

  const lines = readFileSync(".env", "utf8").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    if (!match || match[0].trim().startsWith("#")) {
      continue;
    }

    const [, key, rawValue = ""] = match;
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    process.env[key] ??= value;
  }
}

loadEnvFile();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Add it to .env or set it in your shell.");
}

const users = [
  {
    email: "ava.roman@example.com",
    name: "Ava Roman",
    password: "password123",
  },
  {
    email: "milo.stone@example.com",
    name: "Milo Stone",
    password: "password123",
  },
  {
    email: "nora.chen@example.com",
    name: "Nora Chen",
    password: "password123",
  },
];

const recipes = [
  ["Ava Roman", "Tomato Basil Pasta", "A bright weeknight pasta with a simple tomato sauce.", "spaghetti, tomatoes, garlic, basil, olive oil, parmesan", "Cook pasta. Simmer tomatoes with garlic and olive oil. Toss with basil and parmesan.", 25, 4, ["pasta", "vegetarian"]],
  ["Ava Roman", "Lemon Herb Chicken", "Juicy chicken with lemon, garlic, and herbs.", "chicken thighs, lemon, garlic, thyme, rosemary, olive oil", "Season chicken. Sear until golden, then roast with lemon and herbs until cooked through.", 45, 4, ["chicken", "dinner"]],
  ["Ava Roman", "Blueberry Oat Pancakes", "Fluffy oat pancakes loaded with blueberries.", "rolled oats, flour, milk, eggs, blueberries, baking powder", "Mix batter, fold in blueberries, and cook on a hot griddle until browned.", 20, 3, ["breakfast", "sweet"]],
  ["Ava Roman", "Roasted Vegetable Couscous", "Couscous tossed with caramelized vegetables.", "couscous, zucchini, bell pepper, red onion, chickpeas, parsley", "Roast vegetables and chickpeas. Fluff couscous and toss everything with parsley.", 35, 4, ["vegetarian", "lunch"]],
  ["Ava Roman", "Garlic Butter Shrimp", "Fast shrimp sauteed in garlic butter.", "shrimp, butter, garlic, parsley, lemon juice, chili flakes", "Cook garlic in butter, add shrimp, and finish with lemon and parsley.", 15, 2, ["seafood", "quick"]],
  ["Ava Roman", "Spinach Feta Omelet", "A savory omelet with greens and tangy feta.", "eggs, spinach, feta, scallions, butter, black pepper", "Wilt spinach, pour in eggs, add feta, and fold once set.", 12, 1, ["breakfast", "vegetarian"]],
  ["Ava Roman", "Beef Taco Bowls", "Seasoned beef served over rice with fresh toppings.", "ground beef, rice, black beans, corn, salsa, avocado", "Brown beef with spices. Serve over rice with beans, corn, salsa, and avocado.", 30, 4, ["beef", "meal-prep"]],
  ["Milo Stone", "Mushroom Risotto", "Creamy risotto with browned mushrooms.", "arborio rice, mushrooms, onion, vegetable stock, parmesan, butter", "Cook mushrooms. Stir rice with stock gradually until creamy, then fold in parmesan.", 40, 4, ["rice", "vegetarian"]],
  ["Milo Stone", "Turkey Chili", "A hearty chili with beans and warm spices.", "ground turkey, kidney beans, tomatoes, onion, chili powder, cumin", "Brown turkey and onion. Simmer with beans, tomatoes, and spices until thick.", 50, 6, ["chili", "meal-prep"]],
  ["Milo Stone", "Caprese Sandwich", "Fresh mozzarella, tomato, basil, and pesto.", "ciabatta, mozzarella, tomatoes, basil, pesto, balsamic glaze", "Toast ciabatta, layer fillings, and finish with balsamic glaze.", 10, 2, ["sandwich", "quick"]],
  ["Milo Stone", "Salmon Rice Bowls", "Roasted salmon with rice and crisp vegetables.", "salmon, rice, cucumber, carrots, soy sauce, sesame oil", "Roast salmon. Serve with rice, vegetables, soy sauce, and sesame oil.", 30, 3, ["seafood", "rice"]],
  ["Milo Stone", "Sweet Potato Curry", "A cozy coconut curry with sweet potatoes.", "sweet potatoes, coconut milk, curry paste, spinach, onion, lime", "Simmer sweet potatoes with curry paste and coconut milk. Stir in spinach and lime.", 35, 4, ["curry", "vegetarian"]],
  ["Milo Stone", "Classic Caesar Salad", "Crisp romaine with creamy Caesar dressing.", "romaine, parmesan, croutons, anchovy paste, lemon, olive oil", "Whisk dressing, toss with romaine, parmesan, and croutons.", 15, 4, ["salad", "lunch"]],
  ["Milo Stone", "Banana Walnut Muffins", "Tender muffins with banana and toasted walnuts.", "bananas, flour, walnuts, eggs, butter, brown sugar", "Mix batter, fold in walnuts, and bake until a tester comes out clean.", 32, 12, ["baking", "breakfast"]],
  ["Nora Chen", "Chicken Noodle Soup", "A comforting soup with noodles and vegetables.", "chicken, egg noodles, carrots, celery, onion, chicken stock", "Simmer chicken with vegetables and stock. Add noodles near the end.", 55, 6, ["soup", "chicken"]],
  ["Nora Chen", "Greek Quinoa Salad", "Protein-rich quinoa salad with briny feta.", "quinoa, cucumber, tomatoes, olives, feta, lemon dressing", "Cook quinoa, cool slightly, then toss with vegetables, feta, and dressing.", 25, 4, ["salad", "vegetarian"]],
  ["Nora Chen", "Pork Fried Rice", "Savory fried rice with pork and vegetables.", "rice, pork, peas, carrots, eggs, soy sauce, scallions", "Scramble eggs, stir-fry pork and vegetables, then toss with rice and soy sauce.", 22, 4, ["rice", "quick"]],
  ["Nora Chen", "Black Bean Burgers", "Pan-seared veggie burgers with smoky spices.", "black beans, breadcrumbs, egg, smoked paprika, onion, burger buns", "Mash beans with seasonings, form patties, and cook until crisp.", 28, 4, ["vegetarian", "burgers"]],
  ["Nora Chen", "Apple Cinnamon Crumble", "Warm baked apples under a buttery oat topping.", "apples, oats, flour, butter, cinnamon, brown sugar", "Fill dish with spiced apples, top with crumble, and bake until bubbling.", 45, 6, ["dessert", "baking"]],
  ["Nora Chen", "Pesto Gnocchi", "Soft gnocchi tossed with pesto and tomatoes.", "gnocchi, pesto, cherry tomatoes, parmesan, pine nuts", "Boil gnocchi, toss with pesto and tomatoes, then top with parmesan and pine nuts.", 18, 3, ["pasta", "quick"]],
];

const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  await client.query("BEGIN");
  await client.query("TRUNCATE TABLE recipes, users RESTART IDENTITY CASCADE");

  const userIds = new Map();

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    const result = await client.query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
      [user.email, passwordHash, user.name],
    );
    userIds.set(user.name, result.rows[0].id);
  }

  for (const recipe of recipes) {
    const [
      ownerName,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      servings,
      tags,
    ] = recipe;

    await client.query(
      `INSERT INTO recipes (
        title,
        description,
        ingredients,
        instructions,
        cooking_time,
        servings,
        tags,
        user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        servings,
        tags,
        userIds.get(ownerName),
      ],
    );
  }

  await client.query("COMMIT");
  console.log(`Seeded ${users.length} users and ${recipes.length} recipes.`);
} catch (error) {
  await client.query("ROLLBACK").catch(() => {});
  throw error;
} finally {
  await client.end();
}
