import { igniter } from "@/igniter";
import { prisma } from "@/providers/prisma";
import { Octokit } from "octokit";

export const GithubFeatureProcedure = igniter.procedure({
  name: "GithubFeatureProcedure",
  handler: async (_, { request, context }) => {
    return {
      github: {
        getRepositories: async () => {
          const session = await context.providers.auth.api.getSession({
            headers: request.headers,
          });
          const githubAccount = await prisma.account.findFirst({
            where: {
              userId: session?.user?.id,
              providerId: "github",
            },
          });
          const accessToken = githubAccount?.accessToken;

          if (!accessToken) {
            throw new Error("GitHub token not available");
          }

          const octokit = new Octokit({ auth: accessToken });

          const { data } = await octokit.rest.repos.listForAuthenticatedUser({
            per_page: 100,
          });

          return data;
        },
      },
    };
  },
});
