import { igniter } from "@/igniter";
import { AuthFeatureProcedure } from "../procedures/auth.procedure";

export const AuthController = igniter.controller({
  name: "auth",
  path: "/auth",
  actions: {
    signIn: igniter.mutation({
      method: "POST",
      path: "/sign-in",
      use: [AuthFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.auth.signIn();
        return response.success(result);
      },
    }),
  },
});
