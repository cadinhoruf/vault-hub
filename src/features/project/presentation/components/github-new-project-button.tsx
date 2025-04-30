"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const GithubNewProjectButton = () => {
  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => {
        window.open("https://github.com/new", "_blank");
      }}
    >
      <Icons.plus size={16} />
      <span>Criar seu projeto no GitHub</span>
    </Button>
  );
};
