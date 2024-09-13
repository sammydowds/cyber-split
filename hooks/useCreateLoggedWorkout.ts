import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { throwErrorFromFetcher } from "@/lib/throwErrorFromFetcher";
import { useRouter } from "next/router";
import { LogWorkoutSchema } from "../components/LogWorkout/types";
import { clearDB } from "@/lib/indexedDb";

interface CreateLoggedWorkoutResponse {
  // Define the shape of your response data (e.g., scheduled workout ID, success message, etc.)
}

const createLoggedWorkout = async (
  opts: FetchOptions,
  workout: LogWorkoutSchema,
): Promise<CreateLoggedWorkoutResponse> => {
  const response = await fetch(opts.baseUrl + "/api/log-workout", {
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
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<
    CreateLoggedWorkoutResponse,
    Error,
    LogWorkoutSchema,
    unknown
  >({
    mutationFn: (payload: LogWorkoutSchema) =>
      createLoggedWorkout(opts, payload),
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
    onSuccess: async () => {
      toast.dismiss();
      await clearDB();
      toast.success("Workout in the books!");
      queryClient.invalidateQueries({ queryKey: ["templateWorkout"] });
      queryClient.invalidateQueries({ queryKey: ["generatedWorkout"] });
      queryClient.invalidateQueries({ queryKey: ["trackerData"] });
      router.push("/dashboard");
    },
    ...options,
  });
};

export { useCreateLoggedWorkout };
