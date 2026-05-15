import type { Metadata } from "next";

import { UserRegister } from "@/components/user-register";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a Movie Watchlist account.",
};

export default function RegisterPage() {
  return (
    <div className="auth-page">
      <UserRegister />
    </div>
  );
}
