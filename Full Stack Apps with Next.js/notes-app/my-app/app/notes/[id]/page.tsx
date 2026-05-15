import "dotenv/config";
import { eq, and } from "drizzle-orm";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import * as schema from "@/db/schema";
import { getDb } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export default async function NotePage({
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
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{note.title}</h1>
          <div className="flex gap-2 items-center text-sm text-gray-600">
            <span>Created: {new Date(note.createdAt).toLocaleString()}</span>
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <span>
                Updated: {new Date(note.updatedAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="bg-white p-8 rounded-lg shadow prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {note.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href={`/notes/${note.id}/edit`}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition"
        >
          Edit Note
        </Link>
        <Link
          href={`/notes/${note.id}/delete`}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete Note
        </Link>
        <Link
          href="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Back to Notes
        </Link>
      </div>
    </div>
  );
}
