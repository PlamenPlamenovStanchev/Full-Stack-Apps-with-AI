import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteMovie } from "@/app/actions/admin-movies";
import { AdminMovieCreateForm } from "@/components/admin-movie-create-form";
import { AdminMovieEditForm } from "@/components/admin-movie-edit-form";
import { MoviePoster } from "@/components/movie-poster";
import { getAdminMoviesPage } from "@/db/queries";
import { formatDate } from "@/lib/format";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Manage Movies",
  description: "Add, edit, and delete platform movies.",
};

type AdminMoviesPageProps = {
  searchParams: Promise<{
    page?: string | string[];
    q?: string | string[];
  }>;
};

function parsePage(value: string | string[] | undefined) {
  const pageValue = Array.isArray(value) ? value[0] : value;
  const page = Number(pageValue ?? "1");

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function pageHref(page: number, query: string) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `/admin/movies?${queryString}` : "/admin/movies";
}

export default async function AdminMoviesPage({ searchParams }: AdminMoviesPageProps) {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const query = firstParam(params.q);
  const page = parsePage(params.page);
  const { currentPage, items, totalCount, totalPages } = await getAdminMoviesPage(page, query);

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="section-kicker">Admin Movies</p>
          <h1 className="dashboard-title">Manage catalog movies</h1>
          <p className="dashboard-copy">
            Search, page through, add, edit, or delete movies available across the
            platform.
          </p>
        </div>
        <Link className="button-secondary" href="/admin" prefetch>
          Admin Home
        </Link>
      </section>

      <AdminMovieCreateForm />

      <section className="dashboard-panel">
        <form className="flex flex-col gap-3 sm:flex-row" method="get">
          <input
            className="dashboard-input flex-1"
            defaultValue={query}
            name="q"
            placeholder="Search title, slug, director, or genre"
            type="search"
          />
          <button className="button-secondary" type="submit">
            Search
          </button>
          {query ? (
            <Link className="button-secondary" href="/admin/movies" prefetch>
              Clear
            </Link>
          ) : null}
        </form>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-black text-zinc-950">Movie catalog</h2>
          <p className="text-sm font-bold text-zinc-500">{totalCount} movies</p>
        </div>

        {items.length > 0 ? (
          <div className="mt-5 grid gap-4">
            {items.map((movie) => (
              <article className="admin-movie-item" key={movie.id}>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <MoviePoster
                    alt={`${movie.title} poster`}
                    className="aspect-[2/3] w-24 sm:w-28"
                    posterUrl={movie.posterUrl}
                    sizes="112px"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#cf2f28]">
                      {movie.slug}
                    </p>
                    <h3 className="mt-1 text-2xl font-black text-zinc-950">{movie.title}</h3>
                    <p className="mt-1 text-sm font-medium text-zinc-500">
                      {movie.director} - {movie.genre} - {movie.year}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                      {movie.description}
                    </p>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
                      Added {formatDate(movie.createdAt)}
                    </p>
                  </div>
                  <form action={deleteMovie} className="self-start">
                    <input name="id" type="hidden" value={movie.id} />
                    <button className="button-danger" type="submit">
                      Delete
                    </button>
                  </form>
                </div>

                <details className="mt-5 rounded-lg border border-stone-200 bg-stone-50 p-4">
                  <summary className="cursor-pointer text-sm font-black text-zinc-950">
                    Edit movie
                  </summary>
                  <div className="mt-4">
                    <AdminMovieEditForm movie={movie} />
                  </div>
                </details>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state mt-5">
            <h2>No movies found</h2>
            <p>Try another search or create a new movie above.</p>
          </div>
        )}

        <nav className="mt-6 flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-zinc-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            {currentPage > 1 ? (
              <Link className="button-secondary" href={pageHref(currentPage - 1, query)} prefetch>
                Previous
              </Link>
            ) : (
              <span className="button-disabled">Previous</span>
            )}
            {currentPage < totalPages ? (
              <Link className="button-secondary" href={pageHref(currentPage + 1, query)} prefetch>
                Next
              </Link>
            ) : (
              <span className="button-disabled">Next</span>
            )}
          </div>
        </nav>
      </section>
    </div>
  );
}
