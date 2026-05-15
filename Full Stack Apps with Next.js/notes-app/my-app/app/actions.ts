"use server";

import { eq, and } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as schema from "@/db/schema";
import { getDb } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/auth";

export async function createNote(formData: FormData) {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsString = formData.get("tags") as string;
  const tags = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  await db.insert(schema.notes).values({
    userId: user.userId,
    title,
    content,
    tags: tags.length > 0 ? tags : null,
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateNote(id: string, formData: FormData) {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const tagsString = formData.get("tags") as string;
  const tags = tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  // Verify ownership
  const notes = await db
    .select()
    .from(schema.notes)
    .where(eq(schema.notes.id, id))
    .limit(1);

  if (notes.length === 0 || notes[0].userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(schema.notes)
    .set({
      title,
      content,
      tags: tags.length > 0 ? tags : null,
      updatedAt: sql`now()`,
    })
    .where(and(eq(schema.notes.id, id), eq(schema.notes.userId, user.userId)));

  revalidatePath("/");
  revalidatePath(`/notes/${id}`);
  redirect("/");
}

export async function deleteNote(id: string) {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Verify ownership
  const notes = await db
    .select()
    .from(schema.notes)
    .where(eq(schema.notes.id, id))
    .limit(1);

  if (notes.length === 0 || notes[0].userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(schema.notes)
    .where(and(eq(schema.notes.id, id), eq(schema.notes.userId, user.userId)));

  revalidatePath("/");
  redirect("/");
}
