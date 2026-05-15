import { eq } from "drizzle-orm";
import Link from "next/link";
import * as schema from "@/db/schema";
import { getDb } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/auth";
import { SearchFilter } from "@/app/components/SearchFilter";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 6;

interface SearchParams {
  search?: string;
  tag?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const params = await searchParams;
  const searchQuery = params.search || "";
  const selectedTag = params.tag || "";
  const currentPage = parseInt(params.page || "1", 10);

  // Get current user's notes from DB
  let allNotes = await db
    .select()
    .from(schema.notes)
    .where(eq(schema.notes.userId, user.userId));

  // Filter by search query
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    allNotes = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchLower) ||
        note.content.toLowerCase().includes(searchLower)
    );
  }

  // Filter by tag if selected
  if (selectedTag) {
    allNotes = allNotes.filter((note) => note.tags?.includes(selectedTag));
  }

  // Sort by most recent first
  allNotes = allNotes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Pagination
  const totalNotes = allNotes.length;
  const totalPages = Math.ceil(totalNotes / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotes = allNotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get all unique tags for current user
  const allNotesForTags = await db
    .select()
    .from(schema.notes)
    .where(eq(schema.notes.userId, user.userId));
  const allTags = Array.from(
    new Set(allNotesForTags.flatMap((note) => note.tags || []))
  ).sort();

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <SearchFilter
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        allTags={allTags}
      />

      {/* Notes Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {searchQuery || selectedTag
            ? `Search Results (${totalNotes})`
            : "All Notes"}
        </h2>

        {paginatedNotes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              {searchQuery || selectedTag
                ? "No notes found matching your search."
                : "No notes yet. Create one to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition h-full flex flex-col"
              >
                <Link
                  href={`/notes/${note.id}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2 line-clamp-2"
                >
                  {note.title}
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {note.content}
                </p>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-xs text-gray-500 mb-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Link
                    href={`/notes/${note.id}`}
                    className="flex-1 px-3 py-2 text-center text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                  >
                    View
                  </Link>
                  <Link
                    href={`/notes/${note.id}/edit`}
                    className="flex-1 px-3 py-2 text-center text-sm bg-amber-100 text-amber-600 rounded hover:bg-amber-200 transition"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/notes/${note.id}/delete`}
                    className="flex-1 px-3 py-2 text-center text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                href={`?page=${page}${searchQuery ? `&search=${searchQuery}` : ""}${
                  selectedTag ? `&tag=${selectedTag}` : ""
                }`}
                className={`px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
