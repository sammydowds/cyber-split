import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { LogWorkoutSchema } from "../components/LogWorkoutForm/types";
import { clearDB } from "@/lib/indexedDb";
import { useRouter } from "next/router";

interface CreateLoggedWorkoutResponse {
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
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
  const router = useRouter();
  const queryClient = useQueryClient();
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
