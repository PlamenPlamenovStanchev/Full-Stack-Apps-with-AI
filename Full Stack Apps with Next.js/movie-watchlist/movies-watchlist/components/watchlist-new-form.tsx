"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState, type FormEvent } from "react";

import { addUserMovie, type WatchlistActionState } from "@/app/actions/watchlist";
import type { MovieListItem } from "@/db/queries";

import { MoviePoster } from "./movie-poster";

type WatchlistNewFormProps = {
  movies: MovieListItem[];
  searchQuery: string;
};

const initialState: WatchlistActionState = {
  message: "",
};

export function WatchlistNewForm({ movies, searchQuery }: WatchlistNewFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addUserMovie, initialState);
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0]?.id.toString() ?? "");
  const visibleMovieId = movies.some((movie) => movie.id.toString() === selectedMovieId)
    ? selectedMovieId
    : movies[0]?.id.toString() ?? "";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();

    router.push(query ? `/dashboard/new?q=${encodeURIComponent(query)}` : "/dashboard/new");
  }

  return (
    <section className="dashboard-panel">
      <div>
        <p className="section-kicker">Add Movie</p>
        <h1 className="dashboard-title">Choose a title</h1>
        <p className="dashboard-copy">
          Search by title, director, or genre, then add the movie to your personal
          watchlist.
        </p>
      </div>

      <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
        <input
          className="dashboard-input flex-1"
          defaultValue={searchQuery}
          name="q"
          placeholder="Search movies"
          type="search"
        />
        <button className="button-secondary" type="submit">
          Search
        </button>
      </form>

      <form action={formAction} className="mt-6 grid gap-6">
        <input name="movieId" type="hidden" value={visibleMovieId} />

        {movies.length > 0 ? (
          <div className="grid gap-3">
            {movies.map((movie) => (
              <label
                className={
                  visibleMovieId === movie.id.toString()
                    ? "movie-choice movie-choice-selected"
                    : "movie-choice"
                }
                key={movie.id}
              >
                <input
                  checked={visibleMovieId === movie.id.toString()}
                  className="sr-only"
                  name="movie-choice"
                  onChange={() => setSelectedMovieId(movie.id.toString())}
                  type="radio"
                  value={movie.id}
                />
                <MoviePoster
                  alt={`${movie.title} poster`}
                  className="aspect-[2/3] w-16"
                  posterUrl={movie.posterUrl}
                  sizes="64px"
                />
                <span className="min-w-0">
                  <span className="block font-bold text-zinc-950">{movie.title}</span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    {movie.director} - {movie.genre} - {movie.year}
                  </span>
                </span>
              </label>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No available movies found</h2>
            <p>Try a different search or add more catalog movies first.</p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="auth-field">
            <span>Status</span>
            <select className="dashboard-input" defaultValue="to_watch" name="status">
              <option value="to_watch">To watch</option>
              <option value="watching">Watching</option>
              <option value="watched">Watched</option>
            </select>
          </label>
          <label className="auth-field">
            <span>Rating</span>
            <input className="dashboard-input" max={10} min={1} name="rating" type="number" />
          </label>
        </div>

        <label className="auth-field">
          <span>Review</span>
          <textarea className="dashboard-textarea" name="review" rows={4} />
        </label>

        {state.message ? (
          <p aria-live="polite" className="auth-error">
            {state.message}
          </p>
        ) : null}

        <button className="button-primary" disabled={isPending || !visibleMovieId} type="submit">
          {isPending ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </section>
  );
}
