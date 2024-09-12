import { supabase } from "@/lib/supbaseClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const signOutUser = async () => {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) {
    throw Error;
  }
  return true;
};

export const useSignOut = (options: UseMutationOptions) => {
  return useMutation({
    mutationFn: () => signOutUser(),
    ...options,
  });
};
