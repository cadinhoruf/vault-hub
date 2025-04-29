import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/presentation/components/login-form";
import { Logo } from "@/components/logo";
import { api } from "@/igniter.client";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | VaultHub",
  description:
    "Faça login no VaultHub para gerenciar suas variáveis de ambiente na nuvem.",
};

export default async function LoginPage() {
  const session = await api.auth.getSession.query();
  if (session.data) {
    redirect("/dashboard/projects");
  }
  return (
    <div className="relative flex flex-col justify-center items-center md:grid lg:grid-cols-2 lg:px-0 lg:max-w-none h-screen container">
      <div className="hidden relative lg:flex flex-col bg-muted p-10 dark:border-r h-full text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-slate-900" />
        <div className="z-20 relative flex items-center font-medium text-lg">
          <Logo />
          VaultHub
        </div>
        <div className="z-20 relative mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">O seu cofre de segredos na nuvem</p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-semibold text-2xl tracking-tight">
              Bem-vindo ao VaultHub
            </h1>
            <p className="text-muted-foreground text-sm">
              Armazene suas variáveis de ambiente com segurança na nuvem
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
