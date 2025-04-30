"use client";

import { Icons } from "@/components/icons";
import { GithubNewProjectButton } from "./github-new-project-button";

export function ProjectsEmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 px-4 py-20 border border-dashed rounded-lg w-full h-full">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <div className="bg-muted p-4 rounded-full">
          <Icons.cloud className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">Nenhum projeto encontrado</h2>
          <p className="max-w-md text-muted-foreground">
            Crie um novo repositório no GitHub para começar a gerenciar seus
            projetos e variáveis de ambiente.
          </p>
        </div>
      </div>
      <GithubNewProjectButton />
    </div>
  );
}
