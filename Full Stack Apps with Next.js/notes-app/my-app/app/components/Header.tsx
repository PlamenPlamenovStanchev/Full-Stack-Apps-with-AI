"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/auth-actions";

interface HeaderProps {
  user?: {
    email: string;
    userId: string;
  } | null;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">📝 Notes App</h1>
          <p className="text-gray-600 text-sm">Organize your thoughts</p>
        </div>

        {user && (
          <div className="text-right">
            <p className="text-sm text-gray-700">
              Logged in as <span className="font-medium">{user.email}</span>
            </p>
            <button
              onClick={handleLogout}
              className="mt-1 text-sm text-red-600 hover:text-red-800 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
