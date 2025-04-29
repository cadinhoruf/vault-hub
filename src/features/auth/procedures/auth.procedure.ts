import { igniter } from "@/igniter";
import { redirect } from "next/navigation";

export const AuthFeatureProcedure = igniter.procedure({
  name: "AuthFeatureProcedure",
  handler: async (_, { request, context }) => {
    return {
      auth: {
        signIn: async () => {
          const result = await context.providers.auth.api.signInSocial({
            headers: request.headers,
            body: {
              provider: "github",
              callbackURL: `${process.env.NEXT_PUBLIC_IGNITER_APP_URL}/api/auth/callback/github`,
            },
          });
          return result;
        },
        getSession: async () => {
          const result = await context.providers.auth.api.getSession({
            headers: request.headers,
          });
          return result;
        },
        signOut: async () => {
          const result = await context.providers.auth.api.signOut({
            headers: request.headers,
          });
          return result;
        },
      },
    };
  },
});
