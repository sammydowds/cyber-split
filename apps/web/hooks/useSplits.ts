import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { SplitDeep } from "@/types";

const fetchSplits = async (options: FetchOptions) => {
  const res = await fetch("/api/splits", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Archived split");
  }
  const data = await res.json();
  return data?.data;
};

const useSplits = () => {
  const opts = useFetchOptions();
  return useQuery<SplitDeep[]>({
    queryKey: ["allSplits"],
    queryFn: () => fetchSplits(opts),
  });
};

export { useSplits };
