"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerUser, type AuthActionState } from "@/app/actions/auth";

const initialState: AuthActionState = {
  message: "",
};

export function UserRegister() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <section className="auth-shell">
      <div>
        <p className="section-kicker">Start tracking</p>
        <h1 className="auth-title">Register</h1>
        <p className="auth-copy">
          Create an account to build a personal queue and add ratings and reviews as you
          watch.
        </p>
      </div>

      <form action={formAction} className="auth-form">
        <label className="auth-field">
          <span>Name</span>
          <input autoComplete="name" name="name" required type="text" />
        </label>
        <label className="auth-field">
          <span>Email</span>
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label className="auth-field">
          <span>Password</span>
          <input autoComplete="new-password" minLength={6} name="password" required type="password" />
        </label>

        {state.message ? (
          <p aria-live="polite" className="auth-error">
            {state.message}
          </p>
        ) : null}

        <button className="button-primary w-full" disabled={isPending} type="submit">
          {isPending ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="auth-alt">
        Already have an account?{" "}
        <Link className="font-bold text-[#cf2f28] transition hover:text-zinc-950" href="/login" prefetch>
          Login
        </Link>
      </p>
    </section>
  );
}
