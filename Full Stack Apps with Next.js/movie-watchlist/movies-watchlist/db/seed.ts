import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "./script-client";
import { movies, userMovies, users } from "./schema";

const sampleMovies = [
  {
    title: "Inception",
    slug: "inception",
    description:
      "A skilled thief enters dreams to steal secrets, then faces a final job that asks him to plant an idea instead.",
    year: 2010,
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    title: "Spirited Away",
    slug: "spirited-away",
    description:
      "A young girl wanders into a spirit world and must find the courage to rescue her parents and return home.",
    year: 2001,
    director: "Hayao Miyazaki",
    genre: "Animation",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
  },
  {
    title: "The Grand Budapest Hotel",
    slug: "the-grand-budapest-hotel",
    description:
      "A concierge and lobby boy are pulled into a comic mystery across a changing Europe.",
    year: 2014,
    director: "Wes Anderson",
    genre: "Comedy",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
  },
  {
    title: "Arrival",
    slug: "arrival",
    description:
      "A linguist helps communicate with alien visitors as time, memory, and language begin to bend around her.",
    year: 2016,
    director: "Denis Villeneuve",
    genre: "Sci-Fi",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
  },
];

const sampleUsers = [
  {
    email: "admin@example.com",
    name: "Admin User",
    role: "admin" as const,
    password: "admin123",
  },
  {
    email: "user@example.com",
    name: "Sample User",
    role: "user" as const,
    password: "user123",
  },
];

async function findOrCreateUsers() {
  const seededUsers = [];

  for (const user of sampleUsers) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, user.email),
    });

    if (existingUser) {
      seededUsers.push(existingUser);
      continue;
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const [createdUser] = await db
      .insert(users)
      .values({
        email: user.email,
        name: user.name,
        passwordHash,
        role: user.role,
      })
      .returning();

    seededUsers.push(createdUser);
  }

  return seededUsers;
}

async function findOrCreateMovies() {
  const seededMovies = [];

  for (const movie of sampleMovies) {
    const existingMovie = await db.query.movies.findFirst({
      where: eq(movies.slug, movie.slug),
    });

    if (existingMovie) {
      seededMovies.push(existingMovie);
      continue;
    }

    const [createdMovie] = await db.insert(movies).values(movie).returning();
    seededMovies.push(createdMovie);
  }

  return seededMovies;
}

async function seedUserMovies(userId: number, movieIds: number[]) {
  const watchlistItems = [
    {
      userId,
      movieId: movieIds[0],
      status: "watched" as const,
      rating: 9,
      review: "Smart, tense, and still fun on a rewatch.",
    },
    {
      userId,
      movieId: movieIds[1],
      status: "watched" as const,
      rating: 10,
      review: "Warm, strange, and beautifully paced.",
    },
    {
      userId,
      movieId: movieIds[2],
      status: "to_watch" as const,
      rating: null,
      review: null,
    },
    {
      userId,
      movieId: movieIds[3],
      status: "watching" as const,
      rating: null,
      review: null,
    },
  ];

  for (const item of watchlistItems) {
    const existingItem = await db.query.userMovies.findFirst({
      where: (table, { and, eq: equals }) =>
        and(equals(table.userId, item.userId), equals(table.movieId, item.movieId)),
    });

    if (existingItem) {
      continue;
    }

    await db.insert(userMovies).values(item);
  }
}

async function main() {
  const seededUsers = await findOrCreateUsers();
  const seededMovies = await findOrCreateMovies();
  const sampleUser = seededUsers.find((user) => user.email === "user@example.com");

  if (!sampleUser) {
    throw new Error("Sample user was not created.");
  }

  await seedUserMovies(
    sampleUser.id,
    seededMovies.map((movie) => movie.id),
  );

  console.log(
    `Seeded ${seededUsers.length} users, ${seededMovies.length} movies, and sample watchlist data.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
