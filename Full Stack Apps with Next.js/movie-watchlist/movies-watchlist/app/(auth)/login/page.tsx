import type { Metadata } from "next";

import { UserLogin } from "@/components/user-login";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Movie Watchlist account.",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <UserLogin />
    </div>
  );
}
