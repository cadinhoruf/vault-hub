import { AuthController } from "./auth/controllers/auth.controller";
import { GithubController } from "./github/controllers/github.controller";
import { ProjectController } from "./project/controllers/project.controller";
import { ProjectEnvironmentsController } from "./projectenvironments/controllers/projectenvironments.controller";

export const controllers = {
  AuthController,
  GithubController,
  ProjectController,
  ProjectEnvironmentsController,
};
