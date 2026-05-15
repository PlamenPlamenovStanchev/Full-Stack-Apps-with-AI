import "dotenv/config";
import { eq, and } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { NoteForm } from "@/app/components/NoteForm";
import * as schema from "@/db/schema";
import { getDb } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { id } = await params;

  const notes = await db
    .select()
    .from(schema.notes)
    .where(and(eq(schema.notes.id, id), eq(schema.notes.userId, user.userId)));

  if (notes.length === 0) {
    notFound();
  }

  const note = notes[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Note</h1>
      <NoteForm note={note} isEditing={true} />
    </div>
  );
}
