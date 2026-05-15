import type { Metadata } from "next";

import { MovieCard } from "@/components/movie-card";
import { Pagination } from "@/components/pagination";
import { getMoviesPage } from "@/db/queries";

export const metadata: Metadata = {
  title: "Movies",
  description: "Browse movies added to public watchlists.",
};

type MoviesPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};

function parsePage(value: string | string[] | undefined) {
  const pageValue = Array.isArray(value) ? value[0] : value;
  const page = Number(pageValue ?? "1");

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const { currentPage, items, totalCount, totalPages } = await getMoviesPage(page);

  return (
    <div className="bg-[#f7f7f4]">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8">
          <p className="section-kicker">Movie Library</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
                Browse Movies
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                Explore every movie currently available in the shared watchlist catalog.
              </p>
            </div>
            <p className="text-sm font-bold text-zinc-500">{totalCount} movies</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10 lg:px-8">
        {items.length > 0 ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>No movies yet</h2>
            <p>The movie catalog will appear here after records are added.</p>
          </div>
        )}
      </section>
    </div>
  );
}
