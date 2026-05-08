import "dotenv/config";
import {
  showMainMenu,
  handleListGenres,
  handleListMoviesByGenre,
  handleAddMovie,
  handleDeleteMovie,
  handleListAllMovies,
} from "./menu.js";

async function main() {
  console.clear();
  console.log("╔════════════════════════════════════════════════════╗");
  console.log("║      🎬 Welcome to Movie Catalog Application 🎬     ║");
  console.log("╚════════════════════════════════════════════════════╝\n");

  let running = true;

  while (running) {
    try {
      const choice = await showMainMenu();

      switch (choice) {
        case "list_genres":
          await handleListGenres();
          break;

        case "list_by_genre":
          await handleListMoviesByGenre();
          break;

        case "add_movie":
          await handleAddMovie();
          break;

        case "delete_movie":
          await handleDeleteMovie();
          break;

        case "list_all_movies":
          await handleListAllMovies();
          break;

        case "exit":
          console.log("\n👋 Goodbye!\n");
          running = false;
          break;

        default:
          console.log("Unknown option");
      }
    } catch (error) {
      console.error("❌ Error:", (error as Error).message);
      running = false;
    }
  }

  process.exit(0);
}

main();
