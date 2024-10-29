import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { DeepLoggedWorkout } from "@repo/database";

export interface PreviousWorkoutPayload {
  type: "FIRST" | "LAST";
  dateLogged: Date | null;
  templateWorkoutId: string | null;
}

const fetchPreviousWorkout = async (
  options: FetchOptions,
  payload: PreviousWorkoutPayload,
) => {
  if (!payload?.dateLogged || !payload?.templateWorkoutId) {
    throw Error(
      "Error: missing workout data needed to fetch previous workout data.",
    );
  }
  const params = Object.entries(payload)
    .map((item) => {
      const [key, value] = item;
      return `${key}=${value}&`;
    })
    .join("");
  const res = await fetch(`/api/previous-workout?${params}`, {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch previously logged workout");
  }
  const result = await res.json();
  return result?.data;
};

const usePreviousWorkout = (
  payload: PreviousWorkoutPayload,
  options?: Partial<UseQueryOptions<DeepLoggedWorkout>>,
) => {
  const opts = useFetchOptions();
  return useQuery({
    queryFn: () => fetchPreviousWorkout(opts, payload),
    ...options,
    queryKey: [
      "previousWorkout",
      payload.dateLogged,
      payload.type,
      payload.templateWorkoutId,
    ],
  });
};

export { usePreviousWorkout };
