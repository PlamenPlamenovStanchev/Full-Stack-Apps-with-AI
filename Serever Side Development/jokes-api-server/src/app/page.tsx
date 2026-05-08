export default function Home() {
  return (
    <main className="p-8 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-geist-sans)]">Jokes API Documentation</h1>
      <p className="mb-10 text-lg">A simple REST API built with Next.js App Router, Drizzle ORM, and Neon Serverless Postgres.</p>

      <section className="space-y-6">
        <Endpoint method="GET" path="/api/jokes/random" desc="Gets a random joke from the database." />
        <Endpoint method="GET" path="/api/jokes" desc="Lists all jokes with paging. Examples: /api/jokes or /api/jokes?page=1&limit=5" />
        <Endpoint method="GET" path="/api/jokes?categoryId=1" desc="Lists jokes filtered by a specific category ID." />
        <Endpoint method="GET" path="/api/jokes/:id" desc="Gets a specific joke by its ID." />
        <Endpoint method="POST" path="/api/jokes" desc="Publishes summary. Body requires: { title: string, text: string, categoryId?: number }" />
        <Endpoint method="PATCH" path="/api/jokes/:id" desc="Edits an existing joke. Body can optionally include: { title, text, categoryId }" />
        <Endpoint method="DELETE" path="/api/jokes/:id" desc="Deletes a joke from the database." />
      </section>
    </main>
  );
}

function Endpoint({ method, path, desc }: { method: string; path: string; desc: string }) {
  const methodColors: Record<string, string> = {
    GET: "text-green-500 border-green-200 bg-green-500/10",
    POST: "text-blue-500 border-blue-200 bg-blue-500/10",
    PATCH: "text-yellow-500 border-yellow-200 bg-yellow-500/10",
    DELETE: "text-red-500 border-red-200 bg-red-500/10"
  };

  return (
    <div className="border border-white/20 p-6 rounded-lg bg-black/5 flex flex-col gap-2 mb-4">
      <div className="flex items-center gap-4">
        <span className={`px-2 py-1 rounded font-bold text-sm tracking-wider ${methodColors[method]}`}>{method}</span>
        <code className="text-lg bg-black/10 dark:bg-white/10 px-2 py-1 rounded font-[family-name:var(--font-geist-mono)]">{path}</code>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{desc}</p>
    </div>
  );
}
