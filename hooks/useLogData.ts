import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { DeepTemplateWorkout } from "@/types";
import { getFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";

const lookupLogData = async (options: FetchOptions, id: string) => {
  let workout = undefined;
  const localData = await getFromDB(`${LOG_WORKOUT_KEY}-${id}`);

  if (!localData) {
    const res = await fetch(`/api/template-workout/${id}`, {
      method: "GET",
      ...options.options,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch template workout");
    }
    const data = await res.json();
    workout = data?.data;
  } else {
    workout = localData.data;
  }
  return workout;
};

const useLogData = (
  id: string,
  options?: Partial<UseQueryOptions<DeepTemplateWorkout>>,
) => {
  const opts = useFetchOptions();
  return useQuery<DeepTemplateWorkout>({
    queryKey: ["logData", id],
    queryFn: () => lookupLogData(opts, id),
    ...options,
  });
};

export { useLogData };
