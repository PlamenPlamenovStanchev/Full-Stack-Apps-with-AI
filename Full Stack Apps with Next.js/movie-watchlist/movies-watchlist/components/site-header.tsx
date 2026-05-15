import Link from "next/link";

import { AuthLinks } from "./auth-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link className="flex items-center gap-3" href="/" prefetch>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#cf2f28] text-lg font-black text-white">
            MW
          </span>
          <span>
            <span className="block text-base font-bold tracking-tight text-zinc-950">
              Movie Watchlist
            </span>
            <span className="block text-xs font-medium text-zinc-500">
              Shared picks and personal queues
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <Link className="nav-link" href="/" prefetch>
            Home
          </Link>
          <Link className="nav-link" href="/movies" prefetch>
            Movies
          </Link>
          <Link className="nav-link" href="/about" prefetch>
            About
          </Link>
          <AuthLinks />
        </nav>
      </div>
    </header>
  );
}
