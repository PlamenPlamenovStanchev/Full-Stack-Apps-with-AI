import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/app/components/Header";
import { getCurrentUser } from "@/app/lib/auth";

export const metadata: Metadata = {
  title: "Notes App",
  description: "A simple and elegant notes application built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex flex-col min-h-full bg-gray-50">
        {/* Header */}
        <Header user={user} />

        {/* Navbar */}
        {user && (
          <nav className="bg-blue-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex gap-4 items-center">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-white transition"
                >
                  All Notes
                </Link>
                <Link
                  href="/notes/new"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  + New Note
                </Link>
              </div>
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
            <p>&copy; 2026 Notes App. Built with Next.js 16 + Drizzle ORM + Neon.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
