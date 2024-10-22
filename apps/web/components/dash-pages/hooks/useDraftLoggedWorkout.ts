import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DeepTemplateWorkout } from "@repo/database";
import { getFromDB, LOG_WORKOUT_KEY } from "@/lib/indexedDb";

const lookupDraftLoggedWorkout = async (id?: string) => {
  if (!id) {
    return null;
  }
  const localData = await getFromDB(`${LOG_WORKOUT_KEY}-${id}`);
  return localData?.data ?? null;
};

const useDraftLoggedWorkout = (
  id?: string,
  options?: Partial<UseQueryOptions<DeepTemplateWorkout>>,
) => {
  return useQuery<DeepTemplateWorkout>({
    queryKey: ["logData", id],
    queryFn: () => lookupDraftLoggedWorkout(id),
    ...options,
  });
};

export { useDraftLoggedWorkout };
