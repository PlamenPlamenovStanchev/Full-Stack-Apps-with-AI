"use client";

import { deleteNote } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteConfirmProps {
  noteId: string;
  noteTitle: string;
}

export function DeleteConfirm({ noteId, noteTitle }: DeleteConfirmProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await deleteNote(noteId);
    } catch (err) {
      console.error("Error deleting note:", err);
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Delete Note?</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete <strong>"{noteTitle}"</strong>? This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 transition"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
