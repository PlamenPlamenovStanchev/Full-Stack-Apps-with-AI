"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { logoutUser } from "@/app/actions/auth";

type ProfileUser = {
  id: number;
  email: string;
  name: string;
  role: "user" | "admin";
};

type SessionResponse = {
  authenticated: boolean;
  user: ProfileUser | null;
};

export function UserProfile() {
  const [session, setSession] = useState<SessionResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/session", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!response.ok) {
          throw new Error("Unable to load session.");
        }

        const nextSession = (await response.json()) as SessionResponse;

        if (isMounted) {
          setSession(nextSession);
        }
      } catch {
        if (isMounted) {
          setSession({ authenticated: false, user: null });
        }
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!session) {
    return (
      <section className="auth-shell">
        <p className="text-sm font-bold text-zinc-500">Loading profile...</p>
      </section>
    );
  }

  if (!session.authenticated || !session.user) {
    return (
      <section className="auth-shell">
        <div>
          <p className="section-kicker">Profile</p>
          <h1 className="auth-title">You are not logged in</h1>
          <p className="auth-copy">Login or register to view your account profile.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link className="button-primary" href="/login" prefetch>
            Login
          </Link>
          <Link className="button-secondary" href="/register" prefetch>
            Register
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-shell">
      <div>
        <p className="section-kicker">Profile</p>
        <h1 className="auth-title">{session.user.name}</h1>
        <p className="auth-copy">Your signed session is active for this browser.</p>
      </div>

      <dl className="grid gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5">
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Email</dt>
          <dd className="mt-1 font-semibold text-zinc-950">{session.user.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase tracking-wide text-zinc-500">Role</dt>
          <dd className="mt-1 font-semibold capitalize text-zinc-950">{session.user.role}</dd>
        </div>
      </dl>

      <form action={logoutUser}>
        <button className="button-primary" type="submit">
          Logout
        </button>
      </form>
    </section>
  );
}
