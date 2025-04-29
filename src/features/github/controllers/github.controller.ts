import { igniter } from "@/igniter";
import { GithubFeatureProcedure } from "../procedures/github.procedure";

export const GithubController = igniter.controller({
  name: "github",
  path: "/github",
  actions: {
    getRepos: igniter.query({
      path: "/repos",
      method: "GET",
      use: [GithubFeatureProcedure()],
      handler: async ({ response, context }) => {
        const result = await context.github.getRepos();
        return response.success(result);
      },
    }),
  },
});
