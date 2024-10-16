import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";

interface DeleteSplitResponse {
  success: boolean;
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

const deleteSplit = async (
  opts: FetchOptions,
  data: { id: string },
): Promise<DeleteSplitResponse> => {
  const response = await fetch("/api/delete-split", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useDeleteSplit = (
  options?: UseMutationOptions<DeleteSplitResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<DeleteSplitResponse, Error, { id: string }>({
    mutationFn: (data) => deleteSplit(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue deleting this split.");
    },
    ...options,
  });
};

export { useDeleteSplit };
