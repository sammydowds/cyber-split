import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import {
  CreateActivateSplitPayload,
  createActiveSplitWorkoutSchedule,
  DiscoverSplitDeep,
  SplitDeep,
} from "@repo/database";

interface EndSplitResponse {
  success: boolean;
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

const createActivateSplit = async (
  opts: FetchOptions,
  split: DiscoverSplitDeep,
): Promise<EndSplitResponse> => {
  // construct payload
  const start = new Date();
  const end = new Date(new Date().setDate(new Date().getDate() + 30));
  const { schedule } = createActiveSplitWorkoutSchedule({
    split,
    startDate: new Date(),
  });
  const payload: CreateActivateSplitPayload = {
    start,
    end,
    schedule,
    split,
  };

  const response = await fetch("/api/create-activate-split", {
    method: "POST",
    body: JSON.stringify(payload),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useCreateActivateSplit = (
  options?: UseMutationOptions<EndSplitResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<EndSplitResponse, Error, DiscoverSplitDeep>({
    mutationFn: (data) => createActivateSplit(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue creating and activating this split.");
    },
    ...options,
  });
};

export { useCreateActivateSplit };
