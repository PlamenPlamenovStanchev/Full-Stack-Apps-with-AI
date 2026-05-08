const endpointGroups = [
  {
    title: "Auth",
    description: "Register, sign in, clear the auth cookie, and read the current user.",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/register",
        note: "Body: email, password, name. Returns user and JWT.",
      },
      {
        method: "POST",
        path: "/api/auth/login",
        note: "Body: email, password. Returns user and JWT.",
      },
      {
        method: "POST",
        path: "/api/auth/logout",
        note: "Clears the auth cookie.",
      },
      {
        method: "GET",
        path: "/api/auth/me",
        note: "Requires JWT in the auth cookie or Authorization header.",
      },
    ],
  },
  {
    title: "Public Recipes",
    description: "Read recipes without authentication.",
    endpoints: [
      {
        method: "GET",
        path: "/api/recipes?page=1&pageSize=10",
        note: "Paginated list. Maximum pageSize is 50.",
      },
      {
        method: "GET",
        path: "/api/recipes?tag=vegetarian",
        note: "Filters by a tag stored on the recipe.",
      },
      {
        method: "GET",
        path: "/api/recipes?search=pasta",
        note: "Searches title, description, ingredients, and instructions.",
      },
      {
        method: "GET",
        path: "/api/recipes/:id",
        note: "Returns one recipe with its owner summary.",
      },
    ],
  },
  {
    title: "Protected Recipes",
    description: "Create and manage only the signed-in user's recipes.",
    endpoints: [
      {
        method: "POST",
        path: "/api/recipes",
        note: "Creates a recipe. Requires title, description, ingredients, instructions, cookingTime, servings, tags.",
      },
      {
        method: "PUT",
        path: "/api/recipes/:id",
        note: "Replaces all editable recipe fields. Owner only.",
      },
      {
        method: "PATCH",
        path: "/api/recipes/:id",
        note: "Updates one or more recipe fields. Owner only.",
      },
      {
        method: "DELETE",
        path: "/api/recipes/:id",
        note: "Deletes a recipe. Owner only.",
      },
    ],
  },
];

const examples = [
  `curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"ava.roman@example.com","password":"password123"}'`,
  `curl http://localhost:3000/api/auth/me \\
  -H "Authorization: Bearer <token>"`,
  `curl "http://localhost:3000/api/recipes?search=pasta&page=1&pageSize=5"`,
];

const methodStyles: Record<string, string> = {
  DELETE: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-300",
  GET: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300",
  PATCH: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-300",
  POST: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300",
  PUT: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300",
};

export function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-8 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-8 dark:border-zinc-800 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              Recipes API
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-zinc-950 dark:text-white sm:text-5xl">
              REST API Reference
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              A small Next.js API for user authentication and recipe management.
              Protected endpoints accept a JWT from login or register through
              the `Authorization: Bearer &lt;token&gt;` header.
            </p>
          </div>
          <div className="grid min-w-64 grid-cols-2 gap-3 text-sm">
            <div className="border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-2xl font-semibold">4</div>
              <div className="mt-1 text-zinc-500 dark:text-zinc-400">auth routes</div>
            </div>
            <div className="border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-2xl font-semibold">8</div>
              <div className="mt-1 text-zinc-500 dark:text-zinc-400">recipe routes</div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-3">
          {endpointGroups.map((group) => (
            <div
              key={group.title}
              className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="border-b border-zinc-200 p-5 dark:border-zinc-800">
                <h2 className="text-xl font-semibold">{group.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {group.description}
                </p>
              </div>
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {group.endpoints.map((endpoint) => (
                  <div key={`${endpoint.method}-${endpoint.path}`} className="p-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`inline-flex h-7 min-w-16 items-center justify-center border px-2.5 text-xs font-bold ${methodStyles[endpoint.method]}`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="break-all rounded-sm bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                        {endpoint.path}
                      </code>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {endpoint.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold">Example Requests</h2>
            <div className="mt-5 grid gap-4">
              {examples.map((example) => (
                <pre
                  key={example}
                  className="overflow-x-auto bg-zinc-950 p-4 text-sm leading-6 text-zinc-100"
                >
                  <code>{example}</code>
                </pre>
              ))}
            </div>
          </div>

          <aside className="border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold">Response Shape</h2>
            <dl className="mt-5 space-y-4 text-sm leading-6">
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Auth success
                </dt>
                <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Returns `user` and `token`.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                  List success
                </dt>
                <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Returns `data` and `pagination`.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Errors
                </dt>
                <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Returns `error.code` and `error.message`.
                </dd>
              </div>
            </dl>
          </aside>
        </section>
      </div>
    </main>
  );
}
