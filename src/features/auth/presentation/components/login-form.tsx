"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { authClient } from "@/providers/auth-client";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
      });
      if (error) {
        throw new Error(error.message as string);
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
      toast.error("Erro ao fazer login com GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gap-6 grid">
      <Button
        className="cursor-pointer"
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleLogin}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 w-4 h-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
