import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { DeepTemplateWorkout, SplitDeep } from "@/types";

const fetchTemplateWorkout = async (options: FetchOptions, id: string) => {
  const res = await fetch(`/api/template-workout/${id}`, {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch template workout");
  }
  const data = await res.json();
  return data?.data;
};

const useTemplateWorkout = (id: string) => {
  const opts = useFetchOptions();
  return useQuery<DeepTemplateWorkout>({
    queryKey: ["templateWorkout", id],
    queryFn: () => fetchTemplateWorkout(opts, id),
  });
};

export { useTemplateWorkout };
