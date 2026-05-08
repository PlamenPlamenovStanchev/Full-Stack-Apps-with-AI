import inquirer from "inquirer";
import {
  getGenresWithMovies,
  getAllGenres,
  getAllMovies,
  getMoviesByGenreId,
  addMovie,
  deleteMovie,
} from "./queries.js";

export async function showMainMenu(): Promise<string> {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "🎬 Movie Catalog - Main Menu",
      choices: [
        { name: "📋 List all genres with movies", value: "list_genres" },
        { name: "🎭 List movies by genre", value: "list_by_genre" },
        { name: "➕ Add a new movie", value: "add_movie" },
        { name: "❌ Delete a movie", value: "delete_movie" },
        { name: "🎞️ List all movies", value: "list_all_movies" },
        { name: "🚪 Exit", value: "exit" },
      ],
    },
  ]);
  return answers.action;
}

export async function handleListGenres(): Promise<void> {
  console.log("\n🎬 Loading genres and movies...\n");
  const genresData = await getGenresWithMovies();

  if (genresData.length === 0) {
    console.log("No genres found.");
    return;
  }

  for (const genre of genresData) {
    console.log(`\n📂 ${genre.name} (${genre.movies.length} movies)`);
    console.log("─".repeat(50));

    if (genre.movies.length === 0) {
      console.log("  (no movies in this genre)");
    } else {
      genre.movies.forEach((movie: any, index: number) => {
        console.log(
          `  ${index + 1}. ${movie.title} (${movie.year || "N/A"}) - Rating: ${movie.rating || "N/A"}`
        );
      });
    }
  }
  console.log("\n");
}

export async function handleListMoviesByGenre(): Promise<void> {
  const allGenres = await getAllGenres();

  if (allGenres.length === 0) {
    console.log("No genres found.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "genreId",
      message: "Select a genre:",
      choices: allGenres.map((g: any) => ({ name: g.name, value: g.id })),
    },
  ]);

  const result = await getMoviesByGenreId(answers.genreId);

  console.log(`\n🎭 Movies in "${result.genre.name}" (${result.movies.length})`);
  console.log("─".repeat(70));

  if (result.movies.length === 0) {
    console.log("No movies in this genre.");
  } else {
    result.movies.forEach((movie: any, index: number) => {
      console.log(
        `  ${index + 1}. [ID: ${movie.id}] ${movie.title} (${movie.year || "N/A"}) - Rating: ${movie.rating || "N/A"}`
      );
    });
  }
  console.log("\n");
}

export async function handleAddMovie(): Promise<void> {
  const allGenres = await getAllGenres();

  if (allGenres.length === 0) {
    console.log("No genres available. Please create a genre first.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter movie title:",
      default: "Untitled",
    },
    {
      type: "input",
      name: "year",
      message: "Enter release year (or leave empty):",
      validate: (val) => {
        if (val === "") return true;
        const num = parseInt(val);
        if (isNaN(num) || num < 1800 || num > 2100) {
          return "Please enter a valid year (1800-2100)";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "rating",
      message: "Enter rating (1-10, or leave empty):",
      validate: (val) => {
        if (val === "") return true;
        const num = parseFloat(val);
        if (isNaN(num) || num < 0 || num > 10) {
          return "Please enter a valid rating (0-10)";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "genreId",
      message: "Select a genre:",
      choices: allGenres.map((g: any) => ({ name: g.name, value: g.id })),
    },
  ]);

  try {
    const newMovie = await addMovie(
      answers.title,
      answers.year ? parseInt(answers.year) : null,
      answers.rating || null,
      answers.genreId
    );

    console.log(
      `\n✅ Movie added successfully! (ID: ${newMovie.id}) "${newMovie.title}"\n`
    );
  } catch (error) {
    console.error("\n❌ Error adding movie:", (error as Error).message, "\n");
  }
}

export async function handleDeleteMovie(): Promise<void> {
  const allMovies = await getAllMovies();

  if (allMovies.length === 0) {
    console.log("No movies found to delete.");
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "movieId",
      message: "Select a movie to delete:",
      choices: allMovies.map((m: any) => ({
        name: `${m.title} (${m.year || "N/A"}) - ${m.genreName}`,
        value: m.id,
      })),
    },
    {
      type: "confirm",
      name: "confirmDelete",
      message: "Are you sure you want to delete this movie?",
      default: false,
    },
  ]);

  if (!answers.confirmDelete) {
    console.log("\n❌ Deletion cancelled.\n");
    return;
  }

  try {
    const deletedMovie = await deleteMovie(answers.movieId);
    console.log(`\n✅ Movie deleted successfully! "${deletedMovie.title}"\n`);
  } catch (error) {
    console.error(
      "\n❌ Error deleting movie:",
      (error as Error).message,
      "\n"
    );
  }
}

export async function handleListAllMovies(): Promise<void> {
  console.log("\n🎞️  Loading all movies...\n");
  const allMovies = await getAllMovies();

  if (allMovies.length === 0) {
    console.log("No movies found.");
    return;
  }

  console.log(`📽️  Total Movies: ${allMovies.length}`);
  console.log("─".repeat(70));

  allMovies.forEach((movie: any, index: number) => {
    console.log(
      `  ${index + 1}. [ID: ${movie.id}] ${movie.title} (${movie.year || "N/A"})`
    );
    console.log(
      `      Genre: ${movie.genreName} | Rating: ${movie.rating || "N/A"}`
    );
  });
  console.log("\n");
}
