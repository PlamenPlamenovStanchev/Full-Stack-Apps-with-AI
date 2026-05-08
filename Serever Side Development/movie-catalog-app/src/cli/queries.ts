import "dotenv/config";
import { db } from "../db/index.js";
import { genres, movies } from "../db/schema.js";
import { eq } from "drizzle-orm";

// Get all genres with their movies
export async function getGenresWithMovies() {
  const allGenres = await db
    .select()
    .from(genres)
    .orderBy(genres.name);

  const result = [];
  for (const genre of allGenres) {
    const genreMovies = await db
      .select()
      .from(movies)
      .where(eq(movies.genreId, genre.id))
      .orderBy(movies.title);

    result.push({
      ...genre,
      movies: genreMovies,
    });
  }

  return result;
}

// Get all genres
export async function getAllGenres() {
  return await db.select().from(genres).orderBy(genres.name);
}

// Get all movies
export async function getAllMovies() {
  const allMovies = await db.select().from(movies).orderBy(movies.title);
  // Fetch genre names
  const genreMap = new Map();
  const allGenres = await db.select().from(genres);
  allGenres.forEach((g: any) => genreMap.set(g.id, g.name));

  return allMovies.map((movie: any) => ({
    ...movie,
    genreName: genreMap.get(movie.genreId),
  }));
}

// Get movies by genre ID
export async function getMoviesByGenreId(genreId: number) {
  const genre = await db
    .select()
    .from(genres)
    .where(eq(genres.id, genreId));

  if (!genre.length) {
    throw new Error(`Genre with ID ${genreId} not found`);
  }

  const movieList = await db
    .select()
    .from(movies)
    .where(eq(movies.genreId, genreId))
    .orderBy(movies.title);

  return {
    genre: genre[0],
    movies: movieList,
  };
}

// Add a new movie
export async function addMovie(
  title: string,
  year: number | null,
  rating: string | null,
  genreId: number
) {
  // Verify genre exists
  const genreCheck = await db
    .select()
    .from(genres)
    .where(eq(genres.id, genreId));

  if (!genreCheck.length) {
    throw new Error(`Genre with ID ${genreId} not found`);
  }

  const newMovie = await db
    .insert(movies)
    .values({ title, year, rating, genreId })
    .returning();

  return newMovie[0];
}

// Delete a movie by ID
export async function deleteMovie(movieId: number) {
  const movie = await db
    .select()
    .from(movies)
    .where(eq(movies.id, movieId));

  if (!movie.length) {
    throw new Error(`Movie with ID ${movieId} not found`);
  }

  await db.delete(movies).where(eq(movies.id, movieId));

  return movie[0];
}

// Search movies by title
export async function searchMoviesByTitle(searchTerm: string) {
  const results = await db.select().from(movies);

  // Filter in JavaScript since Drizzle ORM doesn't have great fuzzy search
  return results.filter((m: any) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
