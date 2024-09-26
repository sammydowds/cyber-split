import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";

interface EndSplitResponse {
  success: boolean;
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

const deactivateSplit = async (
  opts: FetchOptions,
  data: { id: string },
): Promise<EndSplitResponse> => {
  const response = await fetch("/api/deactivate-split", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useDeactivateSplit = (
  options?: UseMutationOptions<EndSplitResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<EndSplitResponse, Error, { id: string }>({
    mutationFn: (data) => deactivateSplit(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue deactivating this split.");
    },
    ...options,
  });
};

export { useDeactivateSplit };
