"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";
import { RecipeForm } from "@/components/recipe-form";
import {
  createRecipe,
  getRecipe,
  removeRecipePhoto,
  updateRecipe,
  uploadRecipePhoto,
  type Recipe,
  type RecipeInput,
} from "@/lib/client-api";

type RecipeEditorClientProps =
  | { mode: "create"; id?: never }
  | { mode: "edit"; id: string };

export function RecipeEditorClient({ mode, id }: RecipeEditorClientProps) {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(mode === "edit");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "edit") {
      return;
    }

    getRecipe(id)
      .then(({ recipe }) => setRecipe(recipe))
      .catch((caughtError) =>
        setError(
          caughtError instanceof Error ? caughtError.message : "Recipe not found.",
        ),
      )
      .finally(() => setLoadingRecipe(false));
  }, [mode, id]);

  async function handleSubmit(
    input: RecipeInput,
    photoChange: { file: File | null; remove: boolean },
  ) {
    if (!token) {
      setError("Login required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response =
        mode === "create"
          ? await createRecipe(input, token)
          : await updateRecipe(id, input, token);

      if (photoChange.file) {
        await uploadRecipePhoto(response.recipe.id, photoChange.file, token);
      } else if (photoChange.remove) {
        await removeRecipePhoto(response.recipe.id, token);
      }

      router.push(`/recipes/${response.recipe.id}`);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Could not save recipe.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const title = mode === "create" ? "Create Recipe" : "Edit Recipe";
  const ownsRecipe = mode === "create" || !recipe || recipe.userId === user?.id;

  return (
    <AppShell>
      <main className="mx-auto w-full max-w-3xl px-5 py-8 sm:px-8 lg:px-12">
        <header className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Recipe editor
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">{title}</h1>
        </header>

        {authLoading ? (
          <p className="py-12 text-center text-zinc-500">Checking session...</p>
        ) : !user ? (
          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold">Login required</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              You need an account before saving recipes.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex bg-zinc-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
            >
              Login
            </Link>
          </div>
        ) : error ? (
          <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {user && loadingRecipe ? (
          <p className="py-12 text-center text-zinc-500">Loading recipe...</p>
        ) : user && !ownsRecipe ? (
          <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            You can only edit your own recipes.
          </p>
        ) : user && (mode === "create" || recipe) ? (
          <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <RecipeForm
              recipe={recipe ?? undefined}
              submitting={submitting}
              submitLabel={mode === "create" ? "Create recipe" : "Save changes"}
              onSubmit={handleSubmit}
            />
          </div>
        ) : null}
      </main>
    </AppShell>
  );
}
