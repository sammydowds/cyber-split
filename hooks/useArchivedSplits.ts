import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { SplitDeep } from "@/types";

const fetchArchivedSplit = async (options: FetchOptions) => {
  const res = await fetch("/api/archived-splits", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Archived split");
  }
  const data = await res.json();
  return data?.data;
};

const useArchivedSplit = () => {
  const opts = useFetchOptions();
  return useQuery<SplitDeep[]>({
    queryKey: ["archivedSplit"],
    queryFn: () => fetchArchivedSplit(opts),
  });
};

export { useArchivedSplit };
