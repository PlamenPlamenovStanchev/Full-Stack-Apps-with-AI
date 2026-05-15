"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { logoutUser } from "@/app/actions/auth";

type SessionResponse = {
  authenticated: boolean;
  user: {
    role: "user" | "admin";
  } | null;
};

export function AuthLinks() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!response.ok) {
          return;
        }

        const session = (await response.json()) as SessionResponse;

        if (isMounted) {
          setIsAuthenticated(session.authenticated);
          setIsAdmin(session.user?.role === "admin");
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <span className="h-9 w-24 animate-pulse rounded-md bg-stone-100" />;
  }

  if (isAuthenticated) {
    return (
      <>
        <Link className="nav-link" href="/dashboard" prefetch>
          Dashboard
        </Link>
        {isAdmin ? (
          <Link className="nav-link" href="/admin" prefetch>
            Admin Panel
          </Link>
        ) : null}
        <form action={logoutUser}>
          <button className="nav-link cursor-pointer" type="submit">
            Logout
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <Link className="nav-link" href="/login" prefetch>
        Login
      </Link>
      <Link className="nav-link nav-link-strong" href="/register" prefetch>
        Register
      </Link>
    </>
  );
}
