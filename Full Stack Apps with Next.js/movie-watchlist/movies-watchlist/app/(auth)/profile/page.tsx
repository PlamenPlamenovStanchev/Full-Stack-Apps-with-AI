import type { Metadata } from "next";

import { UserProfile } from "@/components/user-profile";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your Movie Watchlist profile.",
};

export default function ProfilePage() {
  return (
    <div className="auth-page">
      <UserProfile />
    </div>
  );
}
