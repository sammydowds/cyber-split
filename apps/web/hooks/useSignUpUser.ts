import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { schema } from "../components/signup/schema";
import { z } from "zod";

type SuccessResponse = boolean;

const signUpUser = async (formData: z.infer<typeof schema>) => {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return true;
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
