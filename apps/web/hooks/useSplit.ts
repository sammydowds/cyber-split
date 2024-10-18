import { useQuery } from "@tanstack/react-query";
import { useFetchOptions } from "@/hooks/useFetchOptions";
import { SplitDeep } from "@repo/database";

const fetchSplit = async (id: string) => {
  const res = await fetch(`/api/split/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch active split");
  }
  const data = await res.json();
  return data?.data;
};

const useSplit = (id: string) => {
  const opts = useFetchOptions();
  return useQuery<SplitDeep>({
    queryKey: ["split", id],
    queryFn: () => fetchSplit(id),
  });
};

export { useSplit };
