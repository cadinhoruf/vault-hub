"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { api } from "@/igniter.client"
import { toast } from "sonner"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault()
    const response = await api.auth.signIn.mutate();
    if(response.error) {
     toast.error(response.error.data as string)
    }
    if(response.data) {
      toast.success("Login realizado com sucesso")
      router.push("/dashboard")
    }
    setIsLoading(true)
  }

  return (
    <div className="gap-6 grid">
      <Button className="cursor-pointer" variant="outline" type="button" disabled={isLoading} onClick={handleLogin}>
        {isLoading ? (
          <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 w-4 h-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  )
}
