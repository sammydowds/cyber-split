import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { ActiveSplitDeep } from "@repo/database";

const fetchActiveScheduledSplit = async (options: FetchOptions) => {
  const res = await fetch("/api/active-split", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch active split");
  }
  const data = await res.json();
  return data?.data;
};

const useActiveScheduledSplit = () => {
  const opts = useFetchOptions();
  return useQuery<ActiveSplitDeep>({
    queryKey: ["activeSplit"],
    queryFn: () => fetchActiveScheduledSplit(opts),
  });
};

export { useActiveScheduledSplit };
