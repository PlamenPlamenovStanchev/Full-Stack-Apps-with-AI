"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useAuth } from "@/components/auth-provider";
import {
  deleteAdminRecipe,
  deleteAdminUser,
  getAdminRecipes,
  getAdminUsers,
  updateAdminRecipe,
  updateAdminUser,
  type AdminUser,
  type Recipe,
} from "@/lib/client-api";

type AdminTab = "recipes" | "users";

export function AdminPanelClient() {
  const { user, token, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<AdminTab>("recipes");
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user?.isAdmin) {
      return;
    }

    let active = true;
    Promise.all([getAdminRecipes(token), getAdminUsers(token)])
      .then(([recipeResponse, userResponse]) => {
        if (!active) {
          return;
        }

        setRecipes(recipeResponse.recipes);
        setUsers(userResponse.users);
        setError(null);
      })
      .catch((caughtError) => {
        if (active) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Could not load admin data.",
          );
        }
      });

    return () => {
      active = false;
    };
  }, [token, user?.isAdmin]);

  async function handleDeleteRecipe(recipeId: string) {
    if (!token || !window.confirm("Delete this recipe?")) {
      return;
    }

    await deleteAdminRecipe(recipeId, token);
    setRecipes((current) =>
      (current ?? []).filter((recipe) => recipe.id !== recipeId),
    );
  }

  async function handleSaveRecipe(recipe: Recipe) {
    if (!token) {
      return;
    }

    const response = await updateAdminRecipe(
      recipe.id,
      {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        tags: recipe.tags,
      },
      token,
    );
    setRecipes((current) =>
      (current ?? []).map((item) =>
        item.id === recipe.id ? response.recipe : item,
      ),
    );
  }

  async function handleSaveUser(nextUser: AdminUser) {
    if (!token) {
      return;
    }

    const response = await updateAdminUser(
      nextUser.id,
      { name: nextUser.name, isAdmin: nextUser.isAdmin },
      token,
    );
    setUsers((current) =>
      (current ?? []).map((item) =>
        item.id === nextUser.id ? response.user : item,
      ),
    );
  }

  async function handleDeleteUser(userId: string) {
    if (!token || !window.confirm("Delete this user?")) {
      return;
    }

    await deleteAdminUser(userId, token);
    setUsers((current) => (current ?? []).filter((item) => item.id !== userId));
  }

  return (
    <AppShell>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-12">
        <header className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal">
            Admin Panel
          </h1>
        </header>

        {authLoading ? (
          <p className="py-12 text-center text-zinc-500">Checking session...</p>
        ) : !user ? (
          <AdminAccessMessage title="Login required" />
        ) : !user.isAdmin ? (
          <AdminAccessMessage title="Admin access required" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <TabButton active={tab === "recipes"} onClick={() => setTab("recipes")}>
                Manage Recipes
              </TabButton>
              <TabButton active={tab === "users"} onClick={() => setTab("users")}>
                Manage Users
              </TabButton>
            </div>
            {error ? (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}
            {recipes === null || users === null ? (
              <p className="py-12 text-center text-zinc-500">Loading admin data...</p>
            ) : tab === "recipes" ? (
              <AdminRecipesTable
                recipes={recipes}
                onDelete={handleDeleteRecipe}
                onSave={handleSaveRecipe}
              />
            ) : (
              <AdminUsersTable
                currentUserId={user.id}
                users={users}
                onDelete={handleDeleteUser}
                onSave={handleSaveUser}
              />
            )}
          </>
        )}
      </main>
    </AppShell>
  );
}

function AdminAccessMessage({ title }: { title: string }) {
  return (
    <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        You need an admin account to use this page.
      </p>
      <Link
        href="/login"
        className="mt-5 inline-flex bg-zinc-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
      >
        Login
      </Link>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 text-sm font-semibold ${
        active
          ? "bg-emerald-700 text-white"
          : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}

function AdminRecipesTable({
  recipes,
  onDelete,
  onSave,
}: {
  recipes: Recipe[];
  onDelete: (recipeId: string) => Promise<void>;
  onSave: (recipe: Recipe) => Promise<void>;
}) {
  return (
    <div className="grid gap-4">
      {recipes.map((recipe) => (
        <AdminRecipeRow
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

function AdminRecipeRow({
  recipe,
  onDelete,
  onSave,
}: {
  recipe: Recipe;
  onDelete: (recipeId: string) => Promise<void>;
  onSave: (recipe: Recipe) => Promise<void>;
}) {
  const [draft, setDraft] = useState(recipe);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="grid gap-4 border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Title">
          <input
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            className="w-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
        <Field label="Tags">
          <input
            value={draft.tags.join(", ")}
            onChange={(event) =>
              setDraft({
                ...draft,
                tags: event.target.value
                  .split(",")
                  .map((tag) => tag.trim().toLowerCase())
                  .filter(Boolean),
              })
            }
            className="w-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          value={draft.description}
          onChange={(event) =>
            setDraft({ ...draft, description: event.target.value })
          }
          rows={2}
          className="w-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Ingredients">
          <textarea
            value={draft.ingredients}
            onChange={(event) =>
              setDraft({ ...draft, ingredients: event.target.value })
            }
            rows={3}
            className="w-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
        <Field label="Instructions">
          <textarea
            value={draft.instructions}
            onChange={(event) =>
              setDraft({ ...draft, instructions: event.target.value })
            }
            rows={3}
            className="w-full border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Cooking time">
          <input
            type="number"
            min={1}
            value={draft.cookingTime}
            onChange={(event) =>
              setDraft({ ...draft, cookingTime: Number(event.target.value) })
            }
            className="w-32 border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
        <Field label="Servings">
          <input
            type="number"
            min={1}
            value={draft.servings}
            onChange={(event) =>
              setDraft({ ...draft, servings: Number(event.target.value) })
            }
            className="w-32 border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
        <span className="pb-2 text-sm text-zinc-500">
          Owner: {recipe.user?.name ?? recipe.userId}
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
        >
          {saving ? "Saving" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(recipe.id)}
          className="border border-red-300 px-4 py-2 text-sm font-semibold text-red-700"
        >
          Delete
        </button>
        <Link
          href={`/recipes/${recipe.id}`}
          className="border border-zinc-300 px-4 py-2 text-sm font-semibold dark:border-zinc-700"
        >
          View
        </Link>
      </div>
    </article>
  );
}

function AdminUsersTable({
  currentUserId,
  users,
  onDelete,
  onSave,
}: {
  currentUserId: string;
  users: AdminUser[];
  onDelete: (userId: string) => Promise<void>;
  onSave: (user: AdminUser) => Promise<void>;
}) {
  return (
    <div className="overflow-x-auto border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="border-b border-zinc-200 text-xs uppercase text-zinc-500 dark:border-zinc-800">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Admin</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((user) => (
            <AdminUserRow
              key={user.id}
              currentUserId={currentUserId}
              user={user}
              onDelete={onDelete}
              onSave={onSave}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminUserRow({
  currentUserId,
  user,
  onDelete,
  onSave,
}: {
  currentUserId: string;
  user: AdminUser;
  onDelete: (userId: string) => Promise<void>;
  onSave: (user: AdminUser) => Promise<void>;
}) {
  const [draft, setDraft] = useState(user);
  const [saving, setSaving] = useState(false);
  const isCurrentUser = currentUserId === user.id;

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(draft);
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr>
      <td className="px-4 py-3">
        <input
          value={draft.name}
          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
          className="w-full border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </td>
      <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{user.email}</td>
      <td className="px-4 py-3">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={draft.isAdmin}
            disabled={isCurrentUser}
            onChange={(event) =>
              setDraft({ ...draft, isAdmin: event.target.checked })
            }
          />
          <span>{draft.isAdmin ? "Admin" : "User"}</span>
        </label>
      </td>
      <td className="px-4 py-3 text-zinc-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-zinc-950 px-3 py-2 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
          >
            {saving ? "Saving" : "Save"}
          </button>
          <button
            type="button"
            disabled={isCurrentUser}
            onClick={() => onDelete(user.id)}
            className="border border-red-300 px-3 py-2 font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}
