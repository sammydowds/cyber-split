import { useQuery } from "@tanstack/react-query";
import { FetchOptions, useFetchOptions } from "@/hooks/useFetchOptions";
import { useSession } from "./useSession";

const fetchProfile = async (options: FetchOptions) => {
  const res = await fetch("/api/profile", {
    method: "GET",
    ...options.options,
  });

  if (!res.ok) {
    throw new Error("Failed fetch profile");
  }
  const result = await res.json();
  return result?.data;
};

const useProfile = () => {
  const opts = useFetchOptions();
  const { data } = useSession();
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(opts),
    enabled: !!data,
  });
};

export { useProfile, fetchProfile };
