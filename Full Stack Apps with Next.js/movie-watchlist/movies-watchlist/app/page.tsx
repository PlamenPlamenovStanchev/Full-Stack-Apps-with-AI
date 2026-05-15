import Link from "next/link";

import { MoviePoster } from "@/components/movie-poster";
import { getRecentMovieActivity, getRecentlyAddedMovies } from "@/db/queries";
import { formatDate, formatStatus } from "@/lib/format";

export const revalidate = 600;

const feedLimit = 6;

export default async function Home() {
  const [activity, recentMovies] = await Promise.all([
    getRecentMovieActivity(feedLimit),
    getRecentlyAddedMovies(4),
  ]);

  return (
    <div className="bg-[#f7f7f4]">
      <section className="border-b border-stone-200 bg-zinc-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f4c542]">
              Shared watchlists
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Find your next movie from what everyone is adding.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-300">
              Browse the public feed, follow new additions, and keep personal ratings
              and reviews ready for the next movie night.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="button-primary" href="/register" prefetch>
                Register
              </Link>
              <Link className="button-light" href="/login" prefetch>
                Login
              </Link>
              <Link className="button-dark-outline" href="/movies" prefetch>
                Browse Movies
              </Link>
            </div>
          </div>

          {recentMovies.length > 0 ? (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {recentMovies.map((movie, index) => (
                <Link
                  className={index % 2 === 0 ? "mt-8 block" : "block"}
                  href={`/movies/${movie.slug}`}
                  key={movie.id}
                  prefetch
                >
                  <MoviePoster
                  alt={`${movie.title} poster`}
                  className="aspect-[2/3] w-full shadow-2xl shadow-black/40"
                  priority={index === 0}
                  posterUrl={movie.posterUrl}
                  sizes="(max-width: 768px) 22vw, 160px"
                />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-12 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Public Feed</p>
            <h2 className="section-title">Recently added across all users</h2>
          </div>
          <Link className="text-sm font-bold text-[#cf2f28] transition hover:text-zinc-950" href="/movies" prefetch>
            View all movies
          </Link>
        </div>

        {activity.length > 0 ? (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {activity.map((item) => (
              <article className="feed-card" key={item.id}>
                <Link href={`/movies/${item.movie.slug}`} prefetch>
                  <MoviePoster
                    alt={`${item.movie.title} poster`}
                    className="aspect-[2/3] w-24 sm:w-28"
                    posterUrl={item.movie.posterUrl}
                    sizes="112px"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
                    <span className="status-pill">{formatStatus(item.status)}</span>
                    <span className="text-zinc-400">{formatDate(item.addedAt)}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold leading-tight text-zinc-950">
                    <Link className="transition hover:text-[#cf2f28]" href={`/movies/${item.movie.slug}`} prefetch>
                      {item.movie.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-zinc-500">
                    Added by {item.userName} - {item.movie.genre} - {item.movie.year}
                  </p>
                  {item.rating ? (
                    <p className="mt-3 text-sm font-bold text-zinc-950">Rating: {item.rating}/10</p>
                  ) : null}
                  {item.review ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
                      {item.review}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state mt-8">
            <h3>No public activity yet</h3>
            <p>Movies will appear here once users start adding them to watchlists.</p>
          </div>
        )}
      </section>
    </div>
  );
}
