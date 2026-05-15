import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { WatchlistNewForm } from "@/components/watchlist-new-form";
import { searchMoviesForUser } from "@/db/queries";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Add Movie",
  description: "Add a movie to your watchlist.",
};

type DashboardNewPageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export default async function DashboardNewPage({ searchParams }: DashboardNewPageProps) {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";
  const movies = await searchMoviesForUser(session.id, query);

  return (
    <div className="dashboard-page">
      <WatchlistNewForm movies={movies} searchQuery={query} />
    </div>
  );
}
