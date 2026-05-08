"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

const navItems = [
  { href: "/", label: "Browse" },
  { href: "/my-recipes", label: "My Recipes" },
  { href: "/docs", label: "API Docs" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logoutUser } = useAuth();

  async function handleLogout() {
    await logoutUser();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <Link href="/" className="text-2xl font-semibold tracking-normal">
            Recipe Table
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 transition ${
                    active
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {user?.isAdmin ? (
              <Link
                href="/admin"
                className={`px-3 py-2 transition ${
                  pathname === "/admin"
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
              >
                Admin Panel
              </Link>
            ) : null}
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {loading ? (
              <span className="text-zinc-500">Checking session</span>
            ) : user ? (
              <>
                <span className="text-zinc-600 dark:text-zinc-300">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-zinc-300 px-3 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border border-zinc-300 px-3 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-emerald-700 px-3 py-2 font-medium text-white hover:bg-emerald-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
