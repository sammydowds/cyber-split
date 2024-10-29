import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DeepLoggedWorkout } from "@repo/database";
import { getFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";

const fetchLogData = async (opts: FetchOptions, id?: string) => {
  // local
  const localData = await getFromDB(`${LOG_WORKOUT_KEY}-${id}`);
  if (localData) {
    return localData.data;
  }
  // fetch from API
  const response = await fetch(`/api/template-workout/${id}`, {
    method: "GET",
    ...opts.options,
  });

  const apiData = await response.json();
  return { ...apiData?.data, templateWorkoutId: apiData?.data?.id };
};

const useDraftLoggedWorkout = (
  id?: string,
  options?: Partial<UseQueryOptions<DeepLoggedWorkout>>,
) => {
  const opts = useFetchOptions();
  return useQuery<DeepLoggedWorkout>({
    queryKey: ["logData", id],
    queryFn: () => fetchLogData(opts, id),
    ...options,
  });
};

export { useDraftLoggedWorkout };
