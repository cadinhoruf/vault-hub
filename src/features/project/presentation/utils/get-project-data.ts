import { ProjectEnvironments } from "@/features/projectenvironments";
import { Project } from "@/features/project/";

export const getProjectData = (
  repositoryId: string,
  projects: Project[],
  environments: ProjectEnvironments[]
) => {
  const project = projects.find((p) => p.repositoryId === repositoryId);
  const environmentsForProject = environments.filter(
    (env) => env.projectId === project?.id
  );

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

  return { project, variableCount, environmentsForProject };
};
