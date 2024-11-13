import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { ActiveSplitDeep } from "@repo/database";

const fetchActiveSplitDetails = async (id: string, options: FetchOptions) => {
  const res = await fetch(`/api/active-split/${id}`, {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to lookup active split");
  }
  const data = await res.json();
  return data?.data;
};

const useActiveSplitDetails = (id: string) => {
  const opts = useFetchOptions();
  return useQuery<ActiveSplitDeep>({
    queryKey: ["activeSplit", id],
    queryFn: () => fetchActiveSplitDetails(id, opts),
  });
};

export { useActiveSplitDetails };
