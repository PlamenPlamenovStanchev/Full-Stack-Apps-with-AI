import "dotenv/config";
import { initializeDatabase, db } from "./db/index.js";
import { movies } from "./db/schema.js";

async function main() {
  try {
    // Initialize database connection
    await initializeDatabase();

    console.log("Movie Catalog App - Drizzle ORM configured ✓");
    console.log("Available commands:");
    console.log("  npm run db:generate - Generate migrations");
    console.log("  npm run db:push     - Push migrations to database");
    console.log("  npm run db:studio   - Open Drizzle Studio (web UI)");
    console.log("  npm run dev         - Start development server");
  } catch (error) {
    console.error("Failed to initialize:", error);
    process.exit(1);
  }
}

main();
