import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { WorkoutVolumeApiPayload } from "@repo/database";

const fetchSplitWorkoutVolume = async (
  splitId: string,
  options: FetchOptions,
) => {
  const res = await fetch(`/api/workout-volume/${splitId}`, {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch volume data for split");
  }
  const data = await res.json();
  return data?.data;
};

const useSplitWorkoutVolume = (splitId: string) => {
  const opts = useFetchOptions();
  return useQuery<WorkoutVolumeApiPayload>({
    queryKey: ["workoutVolume"],
    queryFn: () => fetchSplitWorkoutVolume(splitId, opts),
  });
};

export { useSplitWorkoutVolume };
