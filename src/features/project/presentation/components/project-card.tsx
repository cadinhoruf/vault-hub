import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/igniter.client";
import { Icons } from "@/components/icons";
export const ProjectCard = async () => {
  const [githubRepositories, projects, projectEnvironments] = await Promise.all(
    [
      api.github.getRepositories.query(),
      api.project.findMany.query(),
      api.projectEnvironments.findMany.query(),
    ]
  );

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {githubRepositories?.data?.map((repository) => {
        const project = projects?.data?.find(
          (p) => p.repositoryId === repository.id.toString()
        );

        const environmentsForProject =
          projectEnvironments?.data?.filter(
            (env) => env.projectId === project?.id
          ) ?? [];

        const variableCount = environmentsForProject.reduce((acc, env) => {
          if (
            env.variables &&
            typeof env.variables === "object" &&
            !Array.isArray(env.variables)
          ) {
            return acc + Object.keys(env.variables).length - 1;
          }
          return acc;
        }, 0);

        return (
          <Card key={repository.id}>
            <CardHeader className="flex items-center gap-2">
              <Icons.gitHub size={16} />
              <CardTitle className="hover:underline cursor-pointer">
                {repository.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="mb-2 text-muted-foreground text-sm">
                {repository.description}
              </p>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icons.gitBranch size={16} />
                  <span>{repository.default_branch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icons.keyRound size={16} />
                  <span>{variableCount + " variáveis de ambiente"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Button variant="outline" className="cursor-pointer">
                <Icons.keyRound size={16} />
                <span>Variáveis</span>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
