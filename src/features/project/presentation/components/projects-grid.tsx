import { api } from "@/igniter.client";
import { ProjectsEmptyState } from "./projects-empty-state";
import { ProjectCard } from "./project-card";

export async function ProjectsGrid() {
  const [githubRepositories, projects, projectEnvironments] = await Promise.all(
    [
      api.github.getRepositories.query(),
      api.project.findMany.query(),
      api.projectEnvironments.findMany.query(),
    ]
  );

  const repositories = githubRepositories?.data || [];
  const projectsList = projects?.data ?? [];
  const environmentsList = projectEnvironments?.data ?? [];

  if (repositories.length === 0) {
    return <ProjectsEmptyState />;
  }

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repository) => (
        <ProjectCard
          key={repository.id}
          repository={repository}
          projectsList={projectsList}
          environmentsList={environmentsList}
        />
      ))}
    </div>
  );
}
