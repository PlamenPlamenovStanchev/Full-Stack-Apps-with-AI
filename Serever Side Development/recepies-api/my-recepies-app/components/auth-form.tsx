"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { loginUser, registerUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRegister = mode === "register";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isRegister) {
        await registerUser(email, password, name);
      } else {
        await loginUser(email, password);
      }

      router.push("/");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Authentication failed.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid w-full max-w-md gap-5 border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div>
        <h1 className="text-3xl font-semibold">
          {isRegister ? "Create account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {isRegister
            ? "Register to create and manage your own recipes."
            : "Login to manage your recipes."}
        </p>
      </div>
      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {isRegister ? (
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
      ) : null}
      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          className="border border-zinc-300 bg-white px-3 py-2 outline-none focus:border-emerald-700 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {submitting ? "Submitting" : isRegister ? "Register" : "Login"}
      </button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          {isRegister ? "Login" : "Register"}
        </Link>
      </p>
    </form>
  );
}
