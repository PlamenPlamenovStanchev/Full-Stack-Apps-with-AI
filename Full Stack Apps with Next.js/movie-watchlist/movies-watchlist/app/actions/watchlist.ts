"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { movies, userMovies } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";

const VALID_STATUSES = ["to_watch", "watching", "watched"] as const;

type WatchlistStatus = (typeof VALID_STATUSES)[number];

export type WatchlistActionState = {
  message: string;
};

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function parseId(value: string) {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseStatus(value: string): WatchlistStatus | null {
  return VALID_STATUSES.find((status) => status === value) ?? null;
}

function parseRating(value: string) {
  if (!value) {
    return { rating: null };
  }

  const rating = Number(value);

  if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
    return { error: "Rating must be a whole number from 1 to 10." };
  }

  return { rating };
}

function readWatchlistFields(formData: FormData) {
  const status = parseStatus(readString(formData, "status"));
  const { error, rating } = parseRating(readString(formData, "rating"));
  const review = readString(formData, "review");

  if (!status) {
    return { error: "Choose a valid watch status." };
  }

  if (error) {
    return { error };
  }

  return {
    rating,
    review: review || null,
    status,
  };
}

export async function addUserMovie(
  _previousState: WatchlistActionState,
  formData: FormData,
): Promise<WatchlistActionState> {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const movieId = parseId(readString(formData, "movieId"));

  if (!movieId) {
    return { message: "Choose a movie to add." };
  }

  const fields = readWatchlistFields(formData);

  if ("error" in fields) {
    return { message: fields.error ?? "The watchlist form is invalid." };
  }

  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, movieId),
  });

  if (!movie) {
    return { message: "That movie is no longer available." };
  }

  const existingItem = await db.query.userMovies.findFirst({
    where: and(eq(userMovies.userId, session.id), eq(userMovies.movieId, movieId)),
  });

  if (existingItem) {
    return { message: "That movie is already in your watchlist." };
  }

  await db.insert(userMovies).values({
    movieId,
    rating: fields.rating,
    review: fields.review,
    status: fields.status,
    userId: session.id,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/stats");
  redirect("/dashboard");
}

export async function updateUserMovie(
  _previousState: WatchlistActionState,
  formData: FormData,
): Promise<WatchlistActionState> {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const itemId = parseId(readString(formData, "id"));

  if (!itemId) {
    return { message: "The watchlist item could not be found." };
  }

  const fields = readWatchlistFields(formData);

  if ("error" in fields) {
    return { message: fields.error ?? "The watchlist form is invalid." };
  }

  const [updatedItem] = await db
    .update(userMovies)
    .set({
      rating: fields.rating,
      review: fields.review,
      status: fields.status,
    })
    .where(and(eq(userMovies.id, itemId), eq(userMovies.userId, session.id)))
    .returning({ id: userMovies.id });

  if (!updatedItem) {
    return { message: "The watchlist item could not be found." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/stats");
  revalidatePath(`/dashboard/edit/${itemId}`);
  redirect("/dashboard");
}
