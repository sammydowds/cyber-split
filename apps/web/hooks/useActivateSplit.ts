import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { ActiveSplit } from "@prisma/client";
import { createActiveSplitWorkoutSchedule, SplitDeep } from "@repo/database";
import { Split } from "@repo/database/dist/src/client";

interface EndSplitResponse {
  success: boolean;
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

export interface ActivateSplitPayload {
  splitId: string;
  endDate: Date;
  startDate: Date;
  schedule: Object;
}

const activateSplit = async (
  opts: FetchOptions,
  split: SplitDeep,
): Promise<EndSplitResponse> => {
  // construct payload
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(new Date().getDate() + 30));
  const { schedule } = createActiveSplitWorkoutSchedule({
    split,
    startDate: new Date(),
  });
  const payload: ActivateSplitPayload = {
    startDate,
    endDate,
    schedule,
    splitId: split.id,
  };

  const response = await fetch("/api/activate-split", {
    method: "POST",
    body: JSON.stringify(payload),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useActivateSplit = (
  options?: UseMutationOptions<EndSplitResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<EndSplitResponse, Error, SplitDeep>({
    mutationFn: (data) => activateSplit(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue activating this split.");
    },
    ...options,
  });
};

export { useActivateSplit };
