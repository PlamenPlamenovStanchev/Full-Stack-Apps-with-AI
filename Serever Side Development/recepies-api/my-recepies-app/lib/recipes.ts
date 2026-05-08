import type { recipes } from "@/db/schema";

export type RecipeInsert = typeof recipes.$inferInsert;

export function serializeRecipe<T extends { dateCreated: Date }>(recipe: T) {
  return {
    ...recipe,
    dateCreated: recipe.dateCreated.toISOString(),
  };
}
