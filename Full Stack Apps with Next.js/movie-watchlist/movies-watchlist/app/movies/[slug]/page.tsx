import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MoviePoster } from "@/components/movie-poster";
import { getMovieActivity, getMovieBySlug } from "@/db/queries";
import { formatDate, formatStatus } from "@/lib/format";

type MovieDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) {
    return {
      title: "Movie not found",
    };
  }

  return {
    title: movie.title,
    description: movie.description,
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { slug } = await params;
  const [movie, activity] = await Promise.all([
    getMovieBySlug(slug),
    getMovieActivity(slug),
  ]);

  if (!movie) {
    notFound();
  }

  return (
    <div className="bg-[#f7f7f4]">
      <section className="border-b border-stone-200 bg-zinc-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 md:grid-cols-[240px_1fr] md:items-end lg:px-8">
          <MoviePoster
            alt={`${movie.title} poster`}
            className="aspect-[2/3] w-48 shadow-2xl shadow-black/40 md:w-full"
            posterUrl={movie.posterUrl}
            priority
            sizes="(max-width: 768px) 192px, 240px"
          />
          <div>
            <Link className="text-sm font-bold text-[#f4c542] transition hover:text-white" href="/movies" prefetch>
              Browse Movies
            </Link>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
              {movie.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">{movie.description}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-zinc-400">Year</dt>
                <dd className="mt-1 text-lg font-bold">{movie.year}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                  Director
                </dt>
                <dd className="mt-1 text-lg font-bold">{movie.director}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-zinc-400">Genre</dt>
                <dd className="mt-1 text-lg font-bold">{movie.genre}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Watchlist Activity</p>
            <h2 className="section-title">Recent user updates</h2>
          </div>
        </div>

        {activity.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {activity.map((item) => (
              <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm" key={item.id}>
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
                  <span className="status-pill">{formatStatus(item.status)}</span>
                  <span className="text-zinc-400">{formatDate(item.addedAt)}</span>
                </div>
                <p className="mt-3 text-base font-bold text-zinc-950">{item.userName}</p>
                {item.rating ? (
                  <p className="mt-2 text-sm font-bold text-zinc-700">Rating: {item.rating}/10</p>
                ) : null}
                {item.review ? (
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.review}</p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state mt-8">
            <h2>No activity for this movie yet</h2>
            <p>Watchlist updates for this title will show here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
