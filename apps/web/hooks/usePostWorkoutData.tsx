import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { useSession } from "./useSession";
import { PostWorkoutData } from "@repo/database";

const fetchPostWorkoutData = async (
  workoutId: string,
  options: FetchOptions,
) => {
  const res = await fetch(`/api/post-workout/${workoutId}`, {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed fetch profile");
  }
  const result = await res.json();
  return result?.data;
};

const usePostWorkoutData = (id: string) => {
  const opts = useFetchOptions();
  const { data } = useSession();
  return useQuery<PostWorkoutData>({
    queryKey: ["postWorkout", id],
    queryFn: () => fetchPostWorkoutData(id, opts),
    enabled: !!data,
  });
};

export { usePostWorkoutData, fetchPostWorkoutData };
