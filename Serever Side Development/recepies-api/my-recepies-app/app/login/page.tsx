import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <AppShell>
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <AuthForm mode="login" />
      </main>
    </AppShell>
  );
}
