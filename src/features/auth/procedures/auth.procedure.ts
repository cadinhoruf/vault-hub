import { igniter } from "@/igniter";

export const AuthFeatureProcedure = igniter.procedure({
  name: "AuthFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      auth: {
        signIn: async () => {
          const result = await context.providers.auth.api.signInSocial({
            body: {
              provider: "github",
              callbackURL: `${process.env.IGNITER_APP_URL}/api/auth/callback/github`,
            },
          });
          return result;
        },
      },
    };
  },
});
