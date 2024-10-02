import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { LogWorkoutSchema } from "../components/LogWorkoutForm/types";
import { DeepLoggedWorkout } from "@/types";

export interface CreateLoggedWorkoutResponse {
  data: DeepLoggedWorkout;
}

const createLoggedWorkout = async (
  opts: FetchOptions,
  workout: LogWorkoutSchema,
): Promise<CreateLoggedWorkoutResponse> => {
  const response = await fetch("/api/create-logged-workout", {
    method: "POST",
    body: JSON.stringify(workout),
    ...opts.options,
  });

  throwErrorFromFetcher(response);
  return response.json();
};

const useCreateLoggedWorkout = (
  options?: UseMutationOptions<CreateLoggedWorkoutResponse, Error, unknown>,
) => {
  const opts = useFetchOptions();
  return useMutation<
    CreateLoggedWorkoutResponse,
    Error,
    LogWorkoutSchema,
    unknown
  >({
    mutationFn: (payload: LogWorkoutSchema) =>
      createLoggedWorkout(opts, payload),
    ...options,
  });
};

export { useCreateLoggedWorkout };
