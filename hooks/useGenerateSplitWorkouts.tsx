import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { DeepTemplateWorkout } from "@/types";

interface GenerateSplitWorkoutsResponse {
  data: Partial<DeepTemplateWorkout>[];
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

interface Payload {
  splitType: string;
  muscles: string;
}
const generateSplitWorkouts = async (
  opts: FetchOptions,
  data?: Payload,
): Promise<GenerateSplitWorkoutsResponse> => {
  const response = await fetch("/api/generate-split-workouts", {
    method: "POST",
    body: JSON.stringify(data),
    ...opts.options,
  });
  throwErrorFromFetcher(response);
  return response.json();
};

const useGenerateSplitWorkouts = (
  options?: UseMutationOptions<GenerateSplitWorkoutsResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<GenerateSplitWorkoutsResponse, Error, Payload>({
    mutationFn: (data?: Payload) => generateSplitWorkouts(opts, data),
    onError: (error) => {
      toast.error("Sorry, we had an issue building those workouts.");
    },
    ...options,
  });
};

export { useGenerateSplitWorkouts };
