import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-zinc-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-zinc-300">
          Movie Watchlist keeps recent discoveries, ratings, and reviews in one public
          browsing space.
        </p>
        <div className="flex items-center gap-4 font-semibold">
          <Link className="text-zinc-300 transition hover:text-white" href="/movies" prefetch>
            Browse Movies
          </Link>
          <Link className="text-zinc-300 transition hover:text-white" href="/about" prefetch>
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}
