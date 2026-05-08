import { AppShell } from "@/components/app-shell";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return (
    <AppShell>
      <main className="px-5 py-10 sm:px-8 lg:px-12">
        <AuthForm mode="register" />
      </main>
    </AppShell>
  );
}
