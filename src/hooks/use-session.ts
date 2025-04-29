import { api } from "@/igniter.client";

export const useSession = () => {
  const { data: session } = api.auth.getSession.useQuery();
  return {
    session: session?.session,
    user: session?.user,
  };
};
