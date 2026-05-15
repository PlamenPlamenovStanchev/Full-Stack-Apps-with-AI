import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { WatchlistEditForm } from "@/components/watchlist-edit-form";
import { getUserWatchlistItem } from "@/db/queries";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Edit Movie",
  description: "Edit a movie in your watchlist.",
};

type DashboardEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const itemId = Number(id);

  if (!Number.isInteger(itemId) || itemId < 1) {
    notFound();
  }

  const item = await getUserWatchlistItem(session.id, itemId);

  if (!item) {
    notFound();
  }

  return (
    <div className="dashboard-page">
      <WatchlistEditForm item={item} />
    </div>
  );
}
