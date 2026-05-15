import { and, asc, count, desc, eq, ilike, or } from "drizzle-orm";

import { db } from "./index";
import { movies, userMovies, users } from "./schema";

export const MOVIES_PAGE_SIZE = 6;
export const ADMIN_MOVIES_PAGE_SIZE = 5;
export const WATCHLIST_STATUSES = ["to_watch", "watching", "watched"] as const;

export type MovieListItem = typeof movies.$inferSelect;
export type WatchlistStatus = (typeof WATCHLIST_STATUSES)[number];

export type UserWatchlistItem = {
  id: number;
  status: WatchlistStatus;
  rating: number | null;
  review: string | null;
  createdAt: Date;
  movie: {
    id: number;
    title: string;
    slug: string;
    description: string;
    year: number;
    director: string;
    genre: string;
    posterUrl: string;
  };
};

export type MovieActivity = {
  id: number;
  status: "to_watch" | "watching" | "watched";
  rating: number | null;
  review: string | null;
  addedAt: Date;
  userName: string;
  movie: {
    id: number;
    title: string;
    slug: string;
    description: string;
    year: number;
    director: string;
    genre: string;
    posterUrl: string;
  };
};

export async function getRecentMovieActivity(limit = 6): Promise<MovieActivity[]> {
  return db
    .select({
      id: userMovies.id,
      status: userMovies.status,
      rating: userMovies.rating,
      review: userMovies.review,
      addedAt: userMovies.createdAt,
      userName: users.name,
      movie: {
        id: movies.id,
        title: movies.title,
        slug: movies.slug,
        description: movies.description,
        year: movies.year,
        director: movies.director,
        genre: movies.genre,
        posterUrl: movies.posterUrl,
      },
    })
    .from(userMovies)
    .innerJoin(movies, eq(userMovies.movieId, movies.id))
    .innerJoin(users, eq(userMovies.userId, users.id))
    .orderBy(desc(userMovies.createdAt))
    .limit(limit);
}

export async function getRecentlyAddedMovies(limit = 4) {
  return db.query.movies.findMany({
    orderBy: [desc(movies.createdAt)],
    limit,
  });
}

export async function getMoviesPage(page: number, pageSize = MOVIES_PAGE_SIZE) {
  const [{ value: totalCount }] = await db.select({ value: count() }).from(movies);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const offset = (currentPage - 1) * pageSize;

  const items = await db.query.movies.findMany({
    orderBy: [desc(movies.createdAt), asc(movies.title)],
    limit: pageSize,
    offset,
  });

  return {
    currentPage,
    items,
    pageSize,
    totalCount,
    totalPages,
  };
}

export async function getAdminMoviesPage(
  page: number,
  searchQuery: string,
  pageSize = ADMIN_MOVIES_PAGE_SIZE,
) {
  const query = searchQuery.trim();
  const whereClause = query
    ? or(
        ilike(movies.title, `%${query}%`),
        ilike(movies.slug, `%${query}%`),
        ilike(movies.director, `%${query}%`),
        ilike(movies.genre, `%${query}%`),
      )
    : undefined;

  const countQuery = db.select({ value: count() }).from(movies);
  const [{ value: totalCount }] = whereClause
    ? await countQuery.where(whereClause)
    : await countQuery;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const offset = (currentPage - 1) * pageSize;

  const items = await db.query.movies.findMany({
    limit: pageSize,
    offset,
    orderBy: [desc(movies.createdAt), asc(movies.title)],
    where: whereClause,
  });

  return {
    currentPage,
    items,
    pageSize,
    query,
    totalCount,
    totalPages,
  };
}

export async function getMovieBySlug(slug: string) {
  return db.query.movies.findFirst({
    where: eq(movies.slug, slug),
  });
}

export async function getMovieActivity(slug: string, limit = 5) {
  return db
    .select({
      id: userMovies.id,
      status: userMovies.status,
      rating: userMovies.rating,
      review: userMovies.review,
      addedAt: userMovies.createdAt,
      userName: users.name,
    })
    .from(userMovies)
    .innerJoin(movies, eq(userMovies.movieId, movies.id))
    .innerJoin(users, eq(userMovies.userId, users.id))
    .where(eq(movies.slug, slug))
    .orderBy(desc(userMovies.createdAt))
    .limit(limit);
}

export function parseWatchlistStatus(status: string | string[] | undefined) {
  const value = Array.isArray(status) ? status[0] : status;

  return WATCHLIST_STATUSES.find((item) => item === value) ?? null;
}

export async function getUserWatchlist(
  userId: number,
  status: WatchlistStatus | null,
): Promise<UserWatchlistItem[]> {
  const whereClause = status
    ? and(eq(userMovies.userId, userId), eq(userMovies.status, status))
    : eq(userMovies.userId, userId);

  return db
    .select({
      createdAt: userMovies.createdAt,
      id: userMovies.id,
      movie: {
        description: movies.description,
        director: movies.director,
        genre: movies.genre,
        id: movies.id,
        posterUrl: movies.posterUrl,
        slug: movies.slug,
        title: movies.title,
        year: movies.year,
      },
      rating: userMovies.rating,
      review: userMovies.review,
      status: userMovies.status,
    })
    .from(userMovies)
    .innerJoin(movies, eq(userMovies.movieId, movies.id))
    .where(whereClause)
    .orderBy(desc(userMovies.createdAt));
}

export async function searchMoviesForUser(userId: number, query: string, limit = 8) {
  const trimmedQuery = query.trim();
  const userItems = await db.query.userMovies.findMany({
    columns: {
      movieId: true,
    },
    where: eq(userMovies.userId, userId),
  });
  const existingMovieIds = new Set(userItems.map((item) => item.movieId));

  const foundMovies = await db.query.movies.findMany({
    limit,
    orderBy: [desc(movies.createdAt), asc(movies.title)],
    where: trimmedQuery
      ? or(
          ilike(movies.title, `%${trimmedQuery}%`),
          ilike(movies.director, `%${trimmedQuery}%`),
          ilike(movies.genre, `%${trimmedQuery}%`),
        )
      : undefined,
  });

  return foundMovies.filter((movie) => !existingMovieIds.has(movie.id));
}

export async function getUserWatchlistItem(userId: number, itemId: number) {
  const [item] = await db
    .select({
      createdAt: userMovies.createdAt,
      id: userMovies.id,
      movie: {
        description: movies.description,
        director: movies.director,
        genre: movies.genre,
        id: movies.id,
        posterUrl: movies.posterUrl,
        slug: movies.slug,
        title: movies.title,
        year: movies.year,
      },
      rating: userMovies.rating,
      review: userMovies.review,
      status: userMovies.status,
    })
    .from(userMovies)
    .innerJoin(movies, eq(userMovies.movieId, movies.id))
    .where(and(eq(userMovies.id, itemId), eq(userMovies.userId, userId)))
    .limit(1);

  return item ?? null;
}

export async function getUserWatchlistStats(userId: number) {
  const items = await db
    .select({
      genre: movies.genre,
      rating: userMovies.rating,
      status: userMovies.status,
    })
    .from(userMovies)
    .innerJoin(movies, eq(userMovies.movieId, movies.id))
    .where(eq(userMovies.userId, userId));

  const byStatus = {
    to_watch: 0,
    watched: 0,
    watching: 0,
  } satisfies Record<WatchlistStatus, number>;
  const genreCounts = new Map<string, number>();
  let ratingTotal = 0;
  let ratingCount = 0;

  for (const item of items) {
    byStatus[item.status] += 1;
    genreCounts.set(item.genre, (genreCounts.get(item.genre) ?? 0) + 1);

    if (item.rating !== null) {
      ratingTotal += item.rating;
      ratingCount += 1;
    }
  }

  return {
    averageRating: ratingCount > 0 ? ratingTotal / ratingCount : null,
    byStatus,
    ratingCount,
    topGenres: Array.from(genreCounts.entries())
      .map(([genre, total]) => ({ genre, total }))
      .sort((left, right) => right.total - left.total || left.genre.localeCompare(right.genre))
      .slice(0, 5),
    total: items.length,
  };
}
