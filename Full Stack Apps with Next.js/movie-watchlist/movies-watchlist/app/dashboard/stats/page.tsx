import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getUserWatchlistStats, WATCHLIST_STATUSES } from "@/db/queries";
import { formatStatus } from "@/lib/format";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Watchlist Stats",
  description: "View statistics for your movie watchlist.",
};

export default async function DashboardStatsPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const stats = await getUserWatchlistStats(session.id);

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="section-kicker">Stats</p>
          <h1 className="dashboard-title">Your watchlist by the numbers</h1>
          <p className="dashboard-copy">
            A fresh snapshot of statuses, ratings, and genres from your saved movies.
          </p>
        </div>
        <Link className="button-secondary" href="/dashboard" prefetch>
          Back to Dashboard
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="stat-card">
          <p>Total Movies</p>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat-card">
          <p>Average Rating</p>
          <strong>{stats.averageRating === null ? "N/A" : stats.averageRating.toFixed(1)}</strong>
        </article>
        <article className="stat-card">
          <p>Rated Movies</p>
          <strong>{stats.ratingCount}</strong>
        </article>
        <article className="stat-card">
          <p>Top Genres</p>
          <strong>{stats.topGenres.length}</strong>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="dashboard-panel">
          <h2 className="text-xl font-black text-zinc-950">Movies by status</h2>
          <div className="mt-5 grid gap-3">
            {WATCHLIST_STATUSES.map((status) => (
              <div className="stat-row" key={status}>
                <span>{formatStatus(status)}</span>
                <strong>{stats.byStatus[status]}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <h2 className="text-xl font-black text-zinc-950">Top genres</h2>
          {stats.topGenres.length > 0 ? (
            <div className="mt-5 grid gap-3">
              {stats.topGenres.map((item) => (
                <div className="stat-row" key={item.genre}>
                  <span>{item.genre}</span>
                  <strong>{item.total}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              Add movies to start building a genre profile.
            </p>
          )}
        </article>
      </section>
    </div>
  );
}
