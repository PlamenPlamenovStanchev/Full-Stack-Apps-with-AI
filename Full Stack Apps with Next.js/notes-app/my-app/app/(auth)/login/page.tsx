import { getCurrentUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/components/LoginForm";

export default async function LoginPage() {
  // Redirect to home if already logged in
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
}
