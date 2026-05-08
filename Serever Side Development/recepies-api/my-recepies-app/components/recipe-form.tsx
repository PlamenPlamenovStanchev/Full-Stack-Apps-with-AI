"use client";

import { useMemo, useState } from "react";
import type { Recipe, RecipeInput } from "@/lib/client-api";

type RecipeFormProps = {
  recipe?: Recipe;
  submitting: boolean;
  submitLabel: string;
  onSubmit: (
    input: RecipeInput,
    photoChange: { file: File | null; remove: boolean },
  ) => Promise<void>;
};

export function RecipeForm({
  recipe,
  submitting,
  submitLabel,
  onSubmit,
}: RecipeFormProps) {
  const [title, setTitle] = useState(recipe?.title ?? "");
  const [description, setDescription] = useState(recipe?.description ?? "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients ?? "");
  const [instructions, setInstructions] = useState(recipe?.instructions ?? "");
  const [cookingTime, setCookingTime] = useState(String(recipe?.cookingTime ?? 30));
  const [servings, setServings] = useState(String(recipe?.servings ?? 4));
  const [tags, setTags] = useState(recipe?.tags.join(", ") ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    recipe?.photoUrl ?? null,
  );
  const [removePhoto, setRemovePhoto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedTags = useMemo(
    () =>
      tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    [tags],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const time = Number(cookingTime);
    const servingsCount = Number(servings);

    if (!Number.isInteger(time) || time <= 0) {
      setError("Cooking time must be a positive whole number.");
      return;
    }

    if (!Number.isInteger(servingsCount) || servingsCount <= 0) {
      setError("Servings must be a positive whole number.");
      return;
    }

    if (parsedTags.length === 0) {
      setError("Add at least one tag.");
      return;
    }

    await onSubmit(
      {
        title,
        description,
        ingredients,
        instructions,
        cookingTime: time,
        servings: servingsCount,
        tags: Array.from(new Set(parsedTags)),
      },
      {
        file: photoFile,
        remove: removePhoto,
      },
    );
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setRemovePhoto(false);
  }

  function handleRemovePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    setRemovePhoto(Boolean(recipe?.photoUrl));
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <Field label="Title">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <Field label="Description">
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          rows={3}
          className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Cooking time">
          <input
            type="number"
            min={1}
            value={cookingTime}
            onChange={(event) => setCookingTime(event.target.value)}
            required
            className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
        <Field label="Servings">
          <input
            type="number"
            min={1}
            value={servings}
            onChange={(event) => setServings(event.target.value)}
            required
            className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </Field>
      </div>
      <Field label="Tags">
        <input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          required
          placeholder="pasta, quick, vegetarian"
          className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <div className="grid gap-3">
        <span className="text-sm font-semibold">Cover image</span>
        {photoPreview ? (
          <div className="overflow-hidden border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoPreview}
              alt="Recipe cover preview"
              className="h-64 w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-48 items-center justify-center border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950">
            No cover image selected
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoChange}
            className="text-sm"
          />
          {photoPreview ? (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="border border-zinc-300 px-3 py-2 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
      <Field label="Ingredients">
        <textarea
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
          required
          rows={5}
          className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <Field label="Instructions">
        <textarea
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
          required
          rows={6}
          className="w-full border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className="bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {submitting ? "Saving" : submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}
