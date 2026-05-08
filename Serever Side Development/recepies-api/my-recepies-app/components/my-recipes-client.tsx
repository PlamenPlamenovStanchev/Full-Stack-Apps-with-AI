"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";
import { RecipeCard } from "@/components/recipe-card";
import { getAllRecipes, type Recipe } from "@/lib/client-api";

export function MyRecipesClient() {
  const { user, loading: authLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    let active = true;

    getAllRecipes()
      .then((allRecipes) => {
        if (!active) {
          return;
        }

        setRecipes(allRecipes);
        setError(null);
      })
      .catch((caughtError) => {
        if (!active) {
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Could not load your recipes.",
        );
      });

    return () => {
      active = false;
    };
  }, [user]);

  const myRecipes = useMemo(
    () => (recipes ?? []).filter((recipe) => recipe.userId === user?.id),
    [recipes, user],
  );

  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-4 border-b border-zinc-200 pb-8 dark:border-zinc-800 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Your kitchen
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              My Recipes
            </h1>
          </div>
          {user ? (
            <Link
              href="/recipes/new"
              className="bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              New Recipe
            </Link>
          ) : null}
        </header>

        {authLoading ? (
          <p className="py-12 text-center text-zinc-500">Checking session...</p>
        ) : !user ? (
          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold">Login required</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Sign in to create and manage your recipes.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex bg-zinc-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
            >
              Login
            </Link>
          </div>
        ) : error ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : recipes === null ? (
          <p className="py-12 text-center text-zinc-500">Loading your recipes...</p>
        ) : myRecipes.length ? (
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {myRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        ) : (
          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold">No recipes yet</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Create your first recipe and it will show up here.
            </p>
          </div>
        )}
      </main>
    </AppShell>
  );
}
