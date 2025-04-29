import { igniter } from "@/igniter";
import type {
  ProjectEnvironments,
  CreateProjectEnvironmentsDTO,
  UpdateProjectEnvironmentsDTO,
  ProjectEnvironmentsQueryParams,
} from "../projectenvironments.interface";

export const ProjectEnvironmentsFeatureProcedure = igniter.procedure({
  name: "ProjectEnvironmentsFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      projectenvironments: {
        findMany: async (
          query: ProjectEnvironmentsQueryParams
        ): Promise<ProjectEnvironments[]> => {
          return context.providers.database.projectEnvironments.findMany({
            where: query.search
              ? {
                  OR: [{ projectId: { contains: query.search } }],
                }
              : undefined,
            skip: query.page
              ? (query.page - 1) * (query.limit || 10)
              : undefined,
            take: query.limit,
            orderBy: query.sortBy
              ? { [query.sortBy]: query.sortOrder || "asc" }
              : undefined,
            include: {
              project: true,
            },
          });
        },
        findOne: async (params: {
          id: string;
        }): Promise<ProjectEnvironments | null> => {
          return context.providers.database.projectEnvironments.findUnique({
            where: {
              id: params.id,
            },
            include: {
              project: true,
            },
          });
        },
        create: async (
          input: CreateProjectEnvironmentsDTO
        ): Promise<ProjectEnvironments> => {
          return context.providers.database.projectEnvironments.create({
            data: {
              projectId: input.projectId,
              variables: input.variables,
              updatedAt: input.updatedAt,
            },
            include: {
              project: true,
            },
          });
        },
        update: async (
          params: { id: string } & UpdateProjectEnvironmentsDTO
        ): Promise<ProjectEnvironments> => {
          const projectenvironments =
            await context.providers.database.projectEnvironments.findUnique({
              where: { id: params.id },
            });
          if (!projectenvironments)
            throw new Error("ProjectEnvironments not found");
          return context.providers.database.projectEnvironments.update({
            where: { id: params.id },
            data: {
              projectId: params.projectId,
              variables: params.variables,
              updatedAt: params.updatedAt,
            },
            include: {
              project: true,
            },
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.projectEnvironments.delete({
            where: { id: params.id },
          });
          return { id: params.id };
        },
      },
    };
  },
});
