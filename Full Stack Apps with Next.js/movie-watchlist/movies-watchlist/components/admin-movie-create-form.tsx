"use client";

import { useActionState } from "react";

import { createMovie, type AdminMovieActionState } from "@/app/actions/admin-movies";

const initialState: AdminMovieActionState = {
  message: "",
};

export function AdminMovieCreateForm() {
  const [state, formAction, isPending] = useActionState(createMovie, initialState);

  return (
    <section className="dashboard-panel">
      <div>
        <p className="section-kicker">Add Movie</p>
        <h2 className="text-2xl font-black tracking-tight text-zinc-950">
          Create a catalog movie
        </h2>
        <p className="dashboard-copy">
          Add a platform movie that users can discover and save to their watchlists.
        </p>
      </div>

      <form action={formAction} className="admin-movie-form">
        <label className="auth-field">
          <span>Title</span>
          <input className="dashboard-input" name="title" required type="text" />
        </label>
        <label className="auth-field">
          <span>Slug</span>
          <input
            className="dashboard-input"
            name="slug"
            placeholder="Auto-generated from title if left blank"
            type="text"
          />
        </label>
        <label className="auth-field sm:col-span-2">
          <span>Description</span>
          <textarea className="dashboard-textarea" name="description" required rows={4} />
        </label>
        <label className="auth-field">
          <span>Year</span>
          <input className="dashboard-input" max={2100} min={1888} name="year" required type="number" />
        </label>
        <label className="auth-field">
          <span>Director</span>
          <input className="dashboard-input" name="director" required type="text" />
        </label>
        <label className="auth-field">
          <span>Genre</span>
          <input className="dashboard-input" name="genre" required type="text" />
        </label>
        <label className="auth-field">
          <span>Poster URL</span>
          <input className="dashboard-input" name="posterUrl" required type="url" />
        </label>

        {state.message ? (
          <p aria-live="polite" className="auth-error sm:col-span-2">
            {state.message}
          </p>
        ) : null}

        <button className="button-primary sm:col-span-2" disabled={isPending} type="submit">
          {isPending ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </section>
  );
}
