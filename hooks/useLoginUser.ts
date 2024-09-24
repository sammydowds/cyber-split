import { schema } from "@/components/login/schema";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";

const loginUser = async (formData: z.infer<typeof schema>) => {
  const { error } = await supabase.auth.signInWithPassword({
    password: formData.password,
    email: formData.email,
  });

  if (error) {
    throw Error;
  }
  return true;
};

type Options = UseMutationOptions<boolean, Error, z.infer<typeof schema>>;

export const useLoginUser = (options: Options) => {
  return useMutation({
    mutationFn: (data: z.infer<typeof schema>) => loginUser(data),
    ...options,
  });
};
