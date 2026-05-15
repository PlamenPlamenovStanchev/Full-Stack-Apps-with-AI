"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { movies } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";

export type AdminMovieActionState = {
  message: string;
};

type MovieFields = {
  description: string;
  director: string;
  genre: string;
  posterUrl: string;
  slug: string;
  title: string;
  year: number;
};

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function parseId(value: string) {
  const id = Number(value);

  return Number.isInteger(id) && id > 0 ? id : null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function requireAdmin() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/dashboard");
  }

  return session;
}

function readMovieFields(formData: FormData): { fields: MovieFields } | { message: string } {
  const title = readString(formData, "title");
  const slug = slugify(readString(formData, "slug") || title);
  const description = readString(formData, "description");
  const director = readString(formData, "director");
  const genre = readString(formData, "genre");
  const posterUrl = readString(formData, "posterUrl");
  const year = Number(readString(formData, "year"));

  if (!title || !slug || !description || !director || !genre || !posterUrl) {
    return { message: "All movie fields are required." };
  }

  if (!Number.isInteger(year) || year < 1888 || year > 2100) {
    return { message: "Enter a valid release year." };
  }

  try {
    new URL(posterUrl);
  } catch {
    return { message: "Enter a valid poster URL." };
  }

  return {
    fields: {
      description,
      director,
      genre,
      posterUrl,
      slug,
      title,
      year,
    },
  };
}

async function ensureUniqueSlug(slug: string, currentMovieId?: number) {
  const existingMovie = await db.query.movies.findFirst({
    where: eq(movies.slug, slug),
  });

  return !existingMovie || existingMovie.id === currentMovieId;
}

function revalidateMoviePages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/movies");
  revalidatePath("/admin/movies");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/stats");

  if (slug) {
    revalidatePath(`/movies/${slug}`);
  }
}

export async function createMovie(
  _previousState: AdminMovieActionState,
  formData: FormData,
): Promise<AdminMovieActionState> {
  await requireAdmin();

  const result = readMovieFields(formData);

  if ("message" in result) {
    return result;
  }

  if (!(await ensureUniqueSlug(result.fields.slug))) {
    return { message: "A movie with that slug already exists." };
  }

  await db.insert(movies).values(result.fields);

  revalidateMoviePages(result.fields.slug);
  redirect("/admin/movies");
}

export async function updateMovie(
  _previousState: AdminMovieActionState,
  formData: FormData,
): Promise<AdminMovieActionState> {
  await requireAdmin();

  const movieId = parseId(readString(formData, "id"));

  if (!movieId) {
    return { message: "Movie not found." };
  }

  const existingMovie = await db.query.movies.findFirst({
    where: eq(movies.id, movieId),
  });

  if (!existingMovie) {
    return { message: "Movie not found." };
  }

  const result = readMovieFields(formData);

  if ("message" in result) {
    return result;
  }

  if (!(await ensureUniqueSlug(result.fields.slug, movieId))) {
    return { message: "A movie with that slug already exists." };
  }

  await db.update(movies).set(result.fields).where(eq(movies.id, movieId));

  revalidateMoviePages(existingMovie.slug);
  revalidateMoviePages(result.fields.slug);
  redirect("/admin/movies");
}

export async function deleteMovie(formData: FormData) {
  await requireAdmin();

  const movieId = parseId(readString(formData, "id"));

  if (!movieId) {
    redirect("/admin/movies");
  }

  const existingMovie = await db.query.movies.findFirst({
    where: eq(movies.id, movieId),
  });

  if (!existingMovie) {
    redirect("/admin/movies");
  }

  await db.delete(movies).where(eq(movies.id, movieId));

  revalidateMoviePages(existingMovie.slug);
  redirect("/admin/movies");
}
