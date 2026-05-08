"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { RecipeCard } from "@/components/recipe-card";
import { getRecipes, type Recipe, type RecipeListResponse } from "@/lib/client-api";

const pageSize = 9;

export function HomeClient() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pagination, setPagination] =
    useState<RecipeListResponse["pagination"] | null>(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("tag") ?? "";
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    getRecipes({ page, pageSize, search, tag })
      .then((response) => {
        if (!active) {
          return;
        }

        setRecipes(response.data);
        setPagination(response.pagination);
        setError(null);
      })
      .catch((caughtError) => {
        if (!active) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Could not load recipes.",
        );
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [page, search, tag]);

  const availableTags = useMemo(
    () => Array.from(new Set(recipes.flatMap((recipe) => recipe.tags))).sort(),
    [recipes],
  );

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setPage(1);
    setSearch(searchInput.trim());
  }

  function handleTag(nextTag: string) {
    setLoading(true);
    setPage(1);
    setTag(nextTag);
    const nextUrl = nextTag ? `/?tag=${encodeURIComponent(nextTag)}` : "/";
    window.history.pushState(null, "", nextUrl);
  }

  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-12">
        <section className="grid gap-6 border-b border-zinc-200 pb-8 dark:border-zinc-800 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Community recipes
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
              Find something good to cook.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Browse seeded recipes, search by keyword, or use tags to narrow
              the table.
            </p>
          </div>
          <form onSubmit={handleSearch} className="grid gap-3">
            <label className="text-sm font-semibold" htmlFor="recipe-search">
              Search recipes
            </label>
            <div className="flex gap-2">
              <input
                id="recipe-search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="pasta, chicken, salad"
                className="min-w-0 flex-1 border border-zinc-300 bg-white px-3 py-3 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-900"
              />
              <button
                type="submit"
                className="bg-zinc-950 px-4 py-3 font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950"
              >
                Search
              </button>
            </div>
          </form>
        </section>

        <section className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleTag("")}
            className={`px-3 py-2 text-sm font-semibold ${
              !tag
                ? "bg-emerald-700 text-white"
                : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            All tags
          </button>
          {availableTags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleTag(item)}
              className={`px-3 py-2 text-sm font-semibold ${
                tag === item
                  ? "bg-emerald-700 text-white"
                  : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {item}
            </button>
          ))}
        </section>

        {error ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="py-12 text-center text-zinc-500">Loading recipes...</p>
        ) : recipes.length ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        ) : (
          <p className="border border-zinc-200 bg-white px-5 py-12 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
            No recipes matched your filters.
          </p>
        )}

        {pagination ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 text-sm dark:border-zinc-800">
            <span className="text-zinc-600 dark:text-zinc-400">
              Page {pagination.page} of {Math.max(pagination.totalPages, 1)} -{" "}
              {pagination.total} recipes
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page <= 1}
                className="border border-zinc-300 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={page >= pagination.totalPages}
                className="border border-zinc-300 px-3 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </AppShell>
  );
}
