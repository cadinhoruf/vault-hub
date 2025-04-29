import { z } from "zod";
import { igniter } from "@/igniter";
import { ProjectEnvironmentsFeatureProcedure } from "@/features/projectenvironments/procedures/projectenvironments.procedure";

export const ProjectEnvironmentsController = igniter.controller({
  name: "project-environments",
  path: "/project-environments",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [ProjectEnvironmentsFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        search: z.string().optional(),
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.projectenvironments.findMany(
          request.query
        );
        return response.success(result);
      },
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [ProjectEnvironmentsFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.projectenvironments.findOne(
          request.params
        );
        return response.success(result);
      },
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [ProjectEnvironmentsFeatureProcedure()],
      body: z.object({
        id: z.string(),
        projectId: z.string(),
        variables: z.any(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.projectenvironments.create({
          ...request.body,
          variables: request.body.variables,
        });
        return response.success(result);
      },
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [ProjectEnvironmentsFeatureProcedure()],
      body: z.object({
        projectId: z.string().optional(),
        variables: z.any().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.projectenvironments.update({
          ...request.params,
          ...request.body,
        });
        return response.success(result);
      },
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [ProjectEnvironmentsFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.projectenvironments.delete(request.params);
        return response.success(null);
      },
    }),
  },
});
