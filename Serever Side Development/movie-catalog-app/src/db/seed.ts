import "dotenv/config";
import { db } from "./index.js";
import { genres, movies } from "./schema.js";

async function seed() {
  try {
    console.log("🌱 Starting database seeding...\n");

    // Insert genres
    const insertedGenres = await db
      .insert(genres)
      .values([
        { name: "Drama" },
        { name: "Action" },
        { name: "Comedy" },
        { name: "Thriller" },
        { name: "Sci-Fi" },
        { name: "Horror" },
        { name: "Animation" },
        { name: "Romance" },
      ])
      .returning();

    console.log(`✓ Inserted ${insertedGenres.length} genres`);
    const genreMap = Object.fromEntries(
      insertedGenres.map((g) => [g.name, g.id])
    );

    // Insert movies (max 20)
    const movieData = [
      {
        title: "The Shawshank Redemption",
        year: 1994,
        rating: "9.3",
        genreId: genreMap["Drama"],
      },
      {
        title: "The Godfather",
        year: 1972,
        rating: "9.2",
        genreId: genreMap["Drama"],
      },
      {
        title: "The Dark Knight",
        year: 2008,
        rating: "9.0",
        genreId: genreMap["Action"],
      },
      {
        title: "Pulp Fiction",
        year: 1994,
        rating: "8.9",
        genreId: genreMap["Thriller"],
      },
      {
        title: "Forrest Gump",
        year: 1994,
        rating: "8.8",
        genreId: genreMap["Drama"],
      },
      {
        title: "Inception",
        year: 2010,
        rating: "8.8",
        genreId: genreMap["Sci-Fi"],
      },
      {
        title: "Fight Club",
        year: 1999,
        rating: "8.8",
        genreId: genreMap["Thriller"],
      },
      {
        title: "The Matrix",
        year: 1999,
        rating: "8.7",
        genreId: genreMap["Sci-Fi"],
      },
      {
        title: "Goodfellas",
        year: 1990,
        rating: "8.7",
        genreId: genreMap["Drama"],
      },
      {
        title: "The Silence of the Lambs",
        year: 1991,
        rating: "8.6",
        genreId: genreMap["Thriller"],
      },
      {
        title: "Saving Private Ryan",
        year: 1998,
        rating: "8.6",
        genreId: genreMap["Action"],
      },
      {
        title: "Spirited Away",
        year: 2001,
        rating: "8.6",
        genreId: genreMap["Animation"],
      },
      {
        title: "The Green Mile",
        year: 1999,
        rating: "8.6",
        genreId: genreMap["Drama"],
      },
      {
        title: "Interstellar",
        year: 2014,
        rating: "8.6",
        genreId: genreMap["Sci-Fi"],
      },
      {
        title: "Parasite",
        year: 2019,
        rating: "8.6",
        genreId: genreMap["Thriller"],
      },
      {
        title: "The Usual Suspects",
        year: 1995,
        rating: "8.5",
        genreId: genreMap["Thriller"],
      },
      {
        title: "Gladiator",
        year: 2000,
        rating: "8.5",
        genreId: genreMap["Action"],
      },
      {
        title: "The Prestige",
        year: 2006,
        rating: "8.5",
        genreId: genreMap["Thriller"],
      },
      {
        title: "Whiplash",
        year: 2014,
        rating: "8.5",
        genreId: genreMap["Drama"],
      },
      {
        title: "Se7en",
        year: 1995,
        rating: "8.6",
        genreId: genreMap["Thriller"],
      },
    ];

    const insertedMovies = await db
      .insert(movies)
      .values(movieData)
      .returning();

    console.log(`✓ Inserted ${insertedMovies.length} movies\n`);

    // Summary
    console.log("📊 Database Seeding Summary:");
    console.log(`   Genres: ${insertedGenres.length}`);
    console.log(`   Movies: ${insertedMovies.length}`);
    console.log("\n✓ Seeding completed successfully!");

    // Show Shawshank details
    const shawshank = insertedMovies.find(
      (m) => m.title === "The Shawshank Redemption"
    );
    if (shawshank) {
      console.log(
        `\n🎬 The Shawshank Redemption: ID ${shawshank.id}, Rating ${shawshank.rating}`
      );
    }
  } catch (error) {
    console.error("✗ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
