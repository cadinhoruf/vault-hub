import { createAuthClient } from "better-auth/client";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_IGNITER_APP_URL}`,
  plugins: [inferAdditionalFields<typeof auth>()],
});
