import { igniter } from "@/igniter";
import type { Project, CreateProjectDTO, UpdateProjectDTO, ProjectQueryParams } from "../project.interface";

export const ProjectFeatureProcedure = igniter.procedure({
  name: "ProjectFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      project: {
        findMany: async (query: ProjectQueryParams): Promise<Project[]> => {
          return context.providers.database.project.findMany({
            where: query.search ? {
              OR: [
                { name: { contains: query.search } },
                { repositoryUrl: { contains: query.search } },
                { repositoryId: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<Project | null> => {
          return context.providers.database.project.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateProjectDTO): Promise<Project> => {
          return context.providers.database.project.create({
            data: {
              name: input.name,
              updatedAt: input.updatedAt,
              repositoryUrl: input.repositoryUrl,
              repositoryId: input.repositoryId,
            }
          });
        },
        update: async (params: { id: string } & UpdateProjectDTO): Promise<Project> => {
          const project = await context.providers.database.project.findUnique({
            where: { id: params.id }
          });
          if (!project) throw new Error("Project not found");
          return context.providers.database.project.update({
            where: { id: params.id },
            data: {
              name: params.name,
              updatedAt: params.updatedAt,
              repositoryUrl: params.repositoryUrl,
              repositoryId: params.repositoryId,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.project.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
