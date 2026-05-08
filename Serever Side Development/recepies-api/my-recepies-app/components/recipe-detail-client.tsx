"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";
import { deleteRecipe, getRecipe, type Recipe } from "@/lib/client-api";
import { useRouter } from "next/navigation";

export function RecipeDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecipe(id)
      .then(({ recipe }) => setRecipe(recipe))
      .catch((caughtError) =>
        setError(
          caughtError instanceof Error ? caughtError.message : "Recipe not found.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (!token || !recipe || !window.confirm("Delete this recipe?")) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      await deleteRecipe(recipe.id, token);
      router.push("/my-recipes");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not delete recipe.",
      );
    } finally {
      setDeleting(false);
    }
  }

  const canManage = Boolean(user && recipe && recipe.userId === user.id);

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 lg:px-12">
        {loading ? (
          <p className="py-12 text-center text-zinc-500">Loading recipe...</p>
        ) : error ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : recipe ? (
          <article className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {recipe.photoUrl ? (
              <div className="h-80 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={recipe.photoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    className="bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-normal">
                {recipe.title}
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                {recipe.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-zinc-500">
                <span>{recipe.cookingTime} minutes</span>
                <span>{recipe.servings} servings</span>
                <span>By {recipe.user?.name ?? "Unknown cook"}</span>
              </div>
              {canManage ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className="bg-zinc-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-50"
                  >
                    {deleting ? "Deleting" : "Delete"}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-2">
              <section>
                <h2 className="text-xl font-semibold">Ingredients</h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-zinc-700 dark:text-zinc-300">
                  {recipe.ingredients}
                </p>
              </section>
              <section>
                <h2 className="text-xl font-semibold">Instructions</h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-zinc-700 dark:text-zinc-300">
                  {recipe.instructions}
                </p>
              </section>
            </div>
          </article>
        ) : null}
      </main>
    </AppShell>
  );
}
