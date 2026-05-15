import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin tools for Movie Watchlist.",
};

export default async function AdminPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-heading">
        <div>
          <p className="section-kicker">Admin Panel</p>
          <h1 className="dashboard-title">Platform management</h1>
          <p className="dashboard-copy">
            Manage shared catalog data for every user on Movie Watchlist.
          </p>
        </div>
        <Link className="button-primary" href="/admin/movies" prefetch>
          Manage Movies
        </Link>
      </section>
    </div>
  );
}
