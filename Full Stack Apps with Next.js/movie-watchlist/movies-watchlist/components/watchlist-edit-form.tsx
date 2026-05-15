"use client";

import { useActionState } from "react";

import { updateUserMovie, type WatchlistActionState } from "@/app/actions/watchlist";
import type { UserWatchlistItem } from "@/db/queries";

import { MoviePoster } from "./movie-poster";

type WatchlistEditFormProps = {
  item: UserWatchlistItem;
};

const initialState: WatchlistActionState = {
  message: "",
};

export function WatchlistEditForm({ item }: WatchlistEditFormProps) {
  const [state, formAction, isPending] = useActionState(updateUserMovie, initialState);

  return (
    <section className="dashboard-panel">
      <div className="flex gap-4">
        <MoviePoster
          alt={`${item.movie.title} poster`}
          className="aspect-[2/3] w-24"
          posterUrl={item.movie.posterUrl}
          sizes="96px"
        />
        <div>
          <p className="section-kicker">Edit Movie</p>
          <h1 className="dashboard-title">{item.movie.title}</h1>
          <p className="dashboard-copy">
            Update the status, rating, and notes for this watchlist item.
          </p>
        </div>
      </div>

      <form action={formAction} className="mt-6 grid gap-5">
        <input name="id" type="hidden" value={item.id} />

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="auth-field">
            <span>Status</span>
            <select className="dashboard-input" defaultValue={item.status} name="status">
              <option value="to_watch">To watch</option>
              <option value="watching">Watching</option>
              <option value="watched">Watched</option>
            </select>
          </label>
          <label className="auth-field">
            <span>Rating</span>
            <input
              className="dashboard-input"
              defaultValue={item.rating ?? ""}
              max={10}
              min={1}
              name="rating"
              type="number"
            />
          </label>
        </div>

        <label className="auth-field">
          <span>Review</span>
          <textarea
            className="dashboard-textarea"
            defaultValue={item.review ?? ""}
            name="review"
            rows={5}
          />
        </label>

        {state.message ? (
          <p aria-live="polite" className="auth-error">
            {state.message}
          </p>
        ) : null}

        <button className="button-primary" disabled={isPending} type="submit">
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
