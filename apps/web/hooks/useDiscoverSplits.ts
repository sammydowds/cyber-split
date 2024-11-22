import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DiscoverSplitDeep } from "@repo/database";

const fetchDiscoverSplits = async () => {
  const res = await fetch("/api/discover", {
    method: "GET",
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
  return useQuery<DiscoverSplitDeep[]>({
    queryKey: ["discoverSplits"],
    queryFn: () => fetchDiscoverSplits(),
    ...options,
  });
};

export { useDiscoverSplits };
