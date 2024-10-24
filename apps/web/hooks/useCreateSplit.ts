import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { DeepTemplateWorkout } from "@repo/database";
import { FormSchemaType } from "@/lib/formSchemas/create";

interface CreateSplitResponse {
  data: Partial<DeepTemplateWorkout>[];
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

const createSplit = async (
  opts: FetchOptions,
  data?: FormSchemaType,
): Promise<CreateSplitResponse> => {
  const response = await fetch("/api/create-split", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useCreateSplit = (
  options?: UseMutationOptions<CreateSplitResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<CreateSplitResponse, Error, FormSchemaType>({
    mutationFn: (data?: FormSchemaType) => createSplit(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue creating this split.");
    },
    ...options,
  });
};

export { useCreateSplit };
