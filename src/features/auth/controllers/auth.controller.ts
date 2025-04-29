import { igniter } from "@/igniter";
import { AuthFeatureProcedure } from "../procedures/auth.procedure";

export const AuthController = igniter.controller({
  name: "auth",
  path: "/auth",
  actions: {
    signIn: igniter.mutation({
      path: "/sign-in",
      method: "POST",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.auth.signIn();
        return response.success(result);
      },
    }),
    getSession: igniter.query({
      path: "/session",
      method: "GET",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.auth.getSession();
        return response.success(result);
      },
    }),
    signOut: igniter.mutation({
      path: "/sign-out",
      method: "POST",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.auth.signOut();
        return response.success(result);
      },
    }),
  },
});
