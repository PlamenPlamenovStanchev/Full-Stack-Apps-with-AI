import Link from "next/link";
import type { Recipe } from "@/lib/client-api";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="flex h-full flex-col border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {recipe.photoUrl ? (
        <div className="-mx-5 -mt-5 mb-5 h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.photoUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex-1">
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-200"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h2 className="mt-4 text-xl font-semibold">{recipe.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {recipe.description}
        </p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4 text-sm dark:border-zinc-800">
        <span className="text-zinc-500">
          {recipe.cookingTime} min - {recipe.servings} servings
        </span>
        <Link
          href={`/recipes/${recipe.id}`}
          className="font-semibold text-emerald-700 hover:text-emerald-900 dark:text-emerald-300"
        >
          View
        </Link>
      </div>
    </article>
  );
}
