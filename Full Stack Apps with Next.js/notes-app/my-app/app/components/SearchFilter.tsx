"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchFilterProps {
  searchQuery: string;
  selectedTag: string;
  allTags: string[];
}

export function SearchFilter({
  searchQuery,
  selectedTag,
  allTags,
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    if (selectedTag) {
      params.set("tag", selectedTag);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Filter Notes</h2>

      <div className="flex gap-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Search by title or content..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {allTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Filter by tag:</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={searchQuery ? `?search=${searchQuery}` : "/"}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedTag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`?tag=${tag}${searchQuery ? `&search=${searchQuery}` : ""}`}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
