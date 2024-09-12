import { useSession } from "./useSession";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface FetchOptions {
  options: RequestInit;
  baseUrl?: string;
}
export const useFetchOptions = (): FetchOptions => {
  const { data } = useSession();
  const payload = {
    headers: {
      Authorization: `Bearer ${data?.access_token}`,
      "Content-Type": "application/json",
    },
  };

  return { options: payload, baseUrl };
};
