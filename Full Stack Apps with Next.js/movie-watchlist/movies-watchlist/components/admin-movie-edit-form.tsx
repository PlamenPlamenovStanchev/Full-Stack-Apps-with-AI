"use client";

import { useActionState } from "react";

import { updateMovie, type AdminMovieActionState } from "@/app/actions/admin-movies";
import type { MovieListItem } from "@/db/queries";

type AdminMovieEditFormProps = {
  movie: MovieListItem;
};

const initialState: AdminMovieActionState = {
  message: "",
};

export function AdminMovieEditForm({ movie }: AdminMovieEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateMovie, initialState);

  return (
    <form action={formAction} className="admin-movie-form">
      <input name="id" type="hidden" value={movie.id} />
      <label className="auth-field">
        <span>Title</span>
        <input className="dashboard-input" defaultValue={movie.title} name="title" required type="text" />
      </label>
      <label className="auth-field">
        <span>Slug</span>
        <input className="dashboard-input" defaultValue={movie.slug} name="slug" required type="text" />
      </label>
      <label className="auth-field sm:col-span-2">
        <span>Description</span>
        <textarea
          className="dashboard-textarea"
          defaultValue={movie.description}
          name="description"
          required
          rows={4}
        />
      </label>
      <label className="auth-field">
        <span>Year</span>
        <input
          className="dashboard-input"
          defaultValue={movie.year}
          max={2100}
          min={1888}
          name="year"
          required
          type="number"
        />
      </label>
      <label className="auth-field">
        <span>Director</span>
        <input
          className="dashboard-input"
          defaultValue={movie.director}
          name="director"
          required
          type="text"
        />
      </label>
      <label className="auth-field">
        <span>Genre</span>
        <input className="dashboard-input" defaultValue={movie.genre} name="genre" required type="text" />
      </label>
      <label className="auth-field">
        <span>Poster URL</span>
        <input
          className="dashboard-input"
          defaultValue={movie.posterUrl}
          name="posterUrl"
          required
          type="url"
        />
      </label>

      {state.message ? (
        <p aria-live="polite" className="auth-error sm:col-span-2">
          {state.message}
        </p>
      ) : null}

      <button className="button-primary sm:col-span-2" disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Save Movie"}
      </button>
    </form>
  );
}
