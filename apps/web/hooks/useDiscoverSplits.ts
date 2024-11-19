import {
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { ActiveSplitDeep, DiscoverSplitDeep, SplitDeep } from "@repo/database";

const fetchDiscoverSplits = async (options: FetchOptions) => {
  const res = await fetch("/api/discover", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch discover splits");
  }
  const data = await res.json();
  return data?.data;
};

const useDiscoverSplits = (
  options?: Partial<UseQueryOptions<DiscoverSplitDeep[]>>,
) => {
  const opts = useFetchOptions();
  return useQuery<DiscoverSplitDeep[]>({
    queryKey: ["discoverSplits"],
    queryFn: () => fetchDiscoverSplits(opts),
    ...options,
  });
};

export { useDiscoverSplits };
