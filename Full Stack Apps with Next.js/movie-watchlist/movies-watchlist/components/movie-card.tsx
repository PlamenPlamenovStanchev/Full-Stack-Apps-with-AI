import Link from "next/link";

import type { MovieListItem } from "@/db/queries";

import { MoviePoster } from "./movie-poster";

type MovieCardProps = {
  movie: MovieListItem;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <Link aria-label={`View ${movie.title}`} href={`/movies/${movie.slug}`} prefetch>
        <MoviePoster
          alt={`${movie.title} poster`}
          className="aspect-[2/3] w-full"
          posterUrl={movie.posterUrl}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 340px"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#cf2f28]">
            {movie.genre} - {movie.year}
          </p>
          <h2 className="mt-1 text-lg font-bold leading-tight text-zinc-950">
            <Link className="transition hover:text-[#cf2f28]" href={`/movies/${movie.slug}`} prefetch>
              {movie.title}
            </Link>
          </h2>
          <p className="mt-1 text-sm font-medium text-zinc-500">Directed by {movie.director}</p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-zinc-600">{movie.description}</p>
      </div>
    </article>
  );
}
