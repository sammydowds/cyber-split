import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

const fetchUserSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Failed to fetch active split");
  }
  return data?.session;
};

const useSession = () => {
  return useQuery<Session | null>({
    queryKey: ["session"],
    queryFn: () => fetchUserSession(),
  });
};

export { useSession };
