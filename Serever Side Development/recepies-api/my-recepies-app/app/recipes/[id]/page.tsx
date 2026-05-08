import { RecipeDetailClient } from "@/components/recipe-detail-client";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RecipeDetailClient id={id} />;
}
