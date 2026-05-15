import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { MoviePoster } from "@/components/movie-poster";
import {
  getUserWatchlist,
  parseWatchlistStatus,
  WATCHLIST_STATUSES,
  type WatchlistStatus,
} from "@/db/queries";
import { formatDate, formatStatus } from "@/lib/format";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your personal movie watchlist.",
};

type DashboardPageProps = {
  searchParams: Promise<{
    status?: string | string[];
  }>;
};

function statusHref(status: WatchlistStatus | null) {
  return status ? `/dashboard?status=${status}` : "/dashboard";
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const status = parseWatchlistStatus(params.status);
  const items = await getUserWatchlist(session.id, status);

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="section-kicker">Dashboard</p>
          <h1 className="dashboard-title">Your watchlist</h1>
          <p className="dashboard-copy">
            Fresh from the database for {session.name}. Filter by status and update
            entries as your movie queue changes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="button-secondary" href="/dashboard/stats" prefetch>
            Stats
          </Link>
          <Link className="button-primary" href="/dashboard/new" prefetch>
            Add Movie
          </Link>
        </div>
      </section>

      <nav className="dashboard-tabs" aria-label="Watchlist filters">
        <Link
          className={status === null ? "dashboard-tab dashboard-tab-active" : "dashboard-tab"}
          href={statusHref(null)}
          prefetch
        >
          All
        </Link>
        {WATCHLIST_STATUSES.map((item) => (
          <Link
            className={status === item ? "dashboard-tab dashboard-tab-active" : "dashboard-tab"}
            href={statusHref(item)}
            key={item}
            prefetch
          >
            {formatStatus(item)}
          </Link>
        ))}
      </nav>

      {items.length > 0 ? (
        <section className="grid gap-4">
          {items.map((item) => (
            <article className="dashboard-list-item" key={item.id}>
              <MoviePoster
                alt={`${item.movie.title} poster`}
                className="aspect-[2/3] w-24 sm:w-28"
                posterUrl={item.movie.posterUrl}
                sizes="112px"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
                  <span className="status-pill">{formatStatus(item.status)}</span>
                  <span className="text-zinc-400">Added {formatDate(item.createdAt)}</span>
                </div>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950">
                  {item.movie.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-zinc-500">
                  {item.movie.director} - {item.movie.genre} - {item.movie.year}
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
              <Link className="button-secondary self-start" href={`/dashboard/edit/${item.id}`} prefetch>
                Edit
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No movies found</h2>
          <p>Add a movie or choose a different status filter.</p>
          <Link className="button-primary mt-5" href="/dashboard/new" prefetch>
            Add Movie
          </Link>
        </section>
      )}
    </div>
  );
}
