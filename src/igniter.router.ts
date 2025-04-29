import { AuthController } from "./features/auth/controllers/auth.controller";
import { igniter } from "./igniter";
import { createIgniterAppContext } from "./igniter.context";

/**
 * @description Initialize the Igniter Router with controllers and context
 * @param {Object} config Router configuration object
 * @param {string} config.baseURL Base URL for the API endpoints
 * @param {string} config.basePATH Base path prefix for all routes
 * @param {Function} config.context Function to create context for each request
 * @param {Object} config.controllers Object containing controller definitions
 * @returns {Router} Initialized Igniter Router instance
 * @example
 * const router = appRouter({
 *   baseURL: 'http://api.example.com',
 *   basePATH: '/v1',
 *   context: createContext,
 *   controllers: {
 *     users: UsersController
 *   }
 * })
 */
export const AppRouter = igniter.router({
  baseURL: process.env.NEXT_PUBLIC_IGNITER_APP_URL,
  basePATH: process.env.IGNITER_APP_BASE_PATH,
  context: createIgniterAppContext,
  controllers: {
    auth: AuthController,
  },
});
