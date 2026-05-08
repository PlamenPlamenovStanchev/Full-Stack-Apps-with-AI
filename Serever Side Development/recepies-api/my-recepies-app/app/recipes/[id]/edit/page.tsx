import { RecipeEditorClient } from "@/components/recipe-editor-client";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RecipeEditorClient mode="edit" id={id} />;
}
