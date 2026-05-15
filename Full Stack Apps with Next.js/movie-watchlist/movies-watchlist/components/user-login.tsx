"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginUser, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {
  message: "",
};

export function UserLogin() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState);

  return (
    <section className="auth-shell">
      <div>
        <p className="section-kicker">Welcome back</p>
        <h1 className="auth-title">Login</h1>
        <p className="auth-copy">
          Sign in to manage your watchlist, update movie status, and keep your ratings
          close at hand.
        </p>
      </div>

      <form action={formAction} className="auth-form">
        <label className="auth-field">
          <span>Email</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <input autoComplete="current-password" name="password" required type="password" />
        </label>

        {state.message ? (
          <p aria-live="polite" className="auth-error">
            {state.message}
          </p>
        ) : null}

        <button className="button-primary w-full" disabled={isPending} type="submit">
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-alt">
        New here?{" "}
        <Link className="font-bold text-[#cf2f28] transition hover:text-zinc-950" href="/register" prefetch>
          Create an account
        </Link>
      </p>
    </section>
  );
}
