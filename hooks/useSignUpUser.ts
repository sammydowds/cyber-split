import { supabase } from "@/lib/supabaseClient";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { schema } from "../components/signup/schema";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

type SuccessResponse = boolean;

const signUpUser = async (formData: z.infer<typeof schema>) => {
  // create an auth user
  const { data, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  if (authError || !data?.user?.email) {
    throw authError;
  }

  // create a profile with auth user
  const profileData = await supabase.from("Profile").insert({
    id: createId(),
    email: data.user.email,
  });

  if (profileData) {
    return true;
  } else {
    return false;
  }
};

type Options = UseMutationOptions<
  SuccessResponse,
  Error,
  z.infer<typeof schema>
>;

export const useSignUpUser = (options: Options) => {
  return useMutation({
    mutationFn: (data: z.infer<typeof schema>) => {
      return signUpUser(data);
    },
    ...options,
  });
};
