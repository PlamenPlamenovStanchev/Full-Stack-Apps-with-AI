import { NoteForm } from "@/app/components/NoteForm";

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Note</h1>
      <NoteForm isEditing={false} />
    </div>
  );
}
