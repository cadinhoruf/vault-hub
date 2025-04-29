import { z } from "zod";
import { igniter } from "@/igniter";
import { ProjectFeatureProcedure } from "../procedures/project.procedure";

export const ProjectController = igniter.controller({
  name: "project",
  path: "/project",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [ProjectFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
        search: z.string().optional(),
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.project.findMany(request.query);
        return response.success(result);
      },
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [ProjectFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.project.findOne(request.params);
        return response.success(result);
      },
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [ProjectFeatureProcedure()],
      body: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        repositoryUrl: z.string(),
        repositoryId: z.string(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.project.create(request.body);
        return response.success(result);
      },
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [ProjectFeatureProcedure()],
      body: z.object({
        name: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        repositoryUrl: z.string().optional(),
        repositoryId: z.string().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.project.update({
          ...request.params,
          ...request.body,
        });
        return response.success(result);
      },
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [ProjectFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.project.delete(request.params);
        return response.success(null);
      },
    }),
  },
});
