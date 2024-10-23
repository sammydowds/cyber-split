import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { DeepLoggedWorkout } from "@repo/database";

const fetchLoggedWorkouts = async (options: FetchOptions) => {
  const res = await fetch("/api/logged-workouts", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch logged workouts");
  }
  const data = await res.json();
  return data?.data;
};

const useLoggedWorkouts = () => {
  const opts = useFetchOptions();
  return useQuery<DeepLoggedWorkout[]>({
    queryKey: ["loggedWorkouts"],
    queryFn: () => fetchLoggedWorkouts(opts),
  });
};

export { useLoggedWorkouts };
