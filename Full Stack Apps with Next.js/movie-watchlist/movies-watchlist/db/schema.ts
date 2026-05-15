import { relations, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const movieStatusEnum = pgEnum("movie_status", [
  "to_watch",
  "watching",
  "watched",
]);

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    name: varchar("name", { length: 120 }).notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const movies = pgTable(
  "movies",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description").notNull(),
    year: integer("year").notNull(),
    director: varchar("director", { length: 255 }).notNull(),
    genre: varchar("genre", { length: 120 }).notNull(),
    posterUrl: text("poster_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("movies_slug_unique").on(table.slug)],
);

export const userMovies = pgTable(
  "user_movies",
  {
    id: serial("id").primaryKey(),
    movieId: integer("movie_id")
      .notNull()
      .references(() => movies.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    status: movieStatusEnum("status").notNull().default("to_watch"),
    rating: integer("rating"),
    review: text("review"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("user_movies_movie_id_idx").on(table.movieId),
    index("user_movies_user_id_idx").on(table.userId),
    uniqueIndex("user_movies_user_movie_unique").on(table.userId, table.movieId),
    check(
      "user_movies_rating_range_check",
      sql`${table.rating} IS NULL OR (${table.rating} >= 1 AND ${table.rating} <= 10)`,
    ),
  ],
);

export const usersRelations = relations(users, ({ many }) => ({
  userMovies: many(userMovies),
}));

export const moviesRelations = relations(movies, ({ many }) => ({
  userMovies: many(userMovies),
}));

export const userMoviesRelations = relations(userMovies, ({ one }) => ({
  movie: one(movies, {
    fields: [userMovies.movieId],
    references: [movies.id],
  }),
  user: one(users, {
    fields: [userMovies.userId],
    references: [users.id],
  }),
}));
