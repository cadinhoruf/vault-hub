"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ProjectNameLink } from "./project-name-href";
import { getProjectData } from "../utils/get-project-data";
import { Badge } from "@/components/ui/badge";
import { Project } from "../..";
import { ProjectEnvironments } from "@/features/projectenvironments";
import { GitHubRepo } from "@/features/github/presentation/utils/types";
import { EnvironmentVariablesDialog } from "./environment-variables-dialog";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
type ProjectCardProps = {
  repository: GitHubRepo;
  projectsList: Project[];
  environmentsList: ProjectEnvironments[];
};

export function ProjectCard({
  repository,
  projectsList,
  environmentsList,
}: ProjectCardProps) {
  const { variableCount } = getProjectData(
    repository.id.toString(),
    projectsList,
    environmentsList
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="flex flex-col border-muted hover:border-primary/50 h-full overflow-hidden transition-colors">
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Icons.gitHub className="w-5 h-5 text-muted-foreground" />
          <CardTitle className="font-medium text-lg">
            <ProjectNameLink
              name={repository.name}
              href={repository.html_url}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          {repository.description ? (
            <p className="mb-4 text-muted-foreground text-sm line-clamp-2">
              {repository.description}
            </p>
          ) : (
            <p className="mb-4 text-muted-foreground text-sm italic">
              Sem descrição
            </p>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Icons.gitBranch className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline" className="font-semibold">
                {repository.default_branch}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Icons.keyRound className="w-4 h-4 text-muted-foreground" />
              <span>
                {variableCount === 0
                  ? "Nenhuma variável"
                  : `${variableCount} variáve${variableCount > 1 ? "is" : "l"}`}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/10 pt-4 border-t">
          <div className="flex gap-2 w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <Icons.keyRound className="mr-2 w-4 h-4" />
                  <span>Variáveis</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Gerenciar variáveis de ambiente</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 cursor-pointer"
                  onClick={() => {
                    window.open(repository.html_url, "_blank");
                  }}
                >
                  <Icons.externalLink className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Abrir repositório</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>

      <EnvironmentVariablesDialog
        open={open}
        onOpenChange={setOpen}
        projectId={repository.id.toString()}
        projectName={repository.name}
        environmentVariables={environmentsList}
        onSave={() => {}}
      />
    </>
  );
}
