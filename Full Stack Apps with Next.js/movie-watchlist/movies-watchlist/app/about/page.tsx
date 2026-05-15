import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Movie Watchlist is built for.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f7f7f4]">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto w-full max-w-4xl px-5 py-12 lg:px-8">
          <p className="section-kicker">About</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
            A public movie shelf with personal notes underneath.
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Movie Watchlist brings together a browsable catalog, shared user activity,
            personal watch states, ratings, and reviews. The public pages make discovery
            easy before someone signs in to manage their own queue.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-4xl gap-5 px-5 py-10 sm:grid-cols-3 lg:px-8">
        <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-950">Browse</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Public movie pages are available to everyone with paged catalog browsing and
            detail pages for each title.
          </p>
        </article>
        <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-950">Track</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Users can mark titles as to watch, watching, or watched, then add optional
            ratings and reviews.
          </p>
        </article>
        <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-950">Share</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Recent additions appear in the public feed so the catalog feels alive as the
            community updates it.
          </p>
        </article>
      </section>

      <section className="mx-auto w-full max-w-4xl px-5 pb-12 lg:px-8">
        <Link className="button-primary" href="/movies" prefetch>
          Browse Movies
        </Link>
      </section>
    </div>
  );
}
