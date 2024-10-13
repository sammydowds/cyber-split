import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { StrengthGroup } from "@prisma/client";
import { FormSchemaType } from "@/components/SplitForm/schema";

export interface Payload {
  group: FormSchemaType["workouts"][number]["strengthGroups"][number];
  ignoreExercises: string[];
}

const fetchSimilarGroups = async (options: FetchOptions, data: Payload) => {
  const res = await fetch("/api/similar-groups", {
    method: "POST",
    body: JSON.stringify(data),
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch similar groups");
  }
  const result = await res.json();
  return result?.data;
};

const useGetSimilarGroups = (
  payload: Payload,
  options?: Partial<UseQueryOptions<StrengthGroup[]>>,
) => {
  const opts = useFetchOptions();
  return useQuery({
    queryFn: () => fetchSimilarGroups(opts, payload),
    ...options,
    queryKey: ["similarGroups", payload.group.name],
  });
};

export { useGetSimilarGroups };
