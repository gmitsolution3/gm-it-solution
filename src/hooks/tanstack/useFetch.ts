import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";

type UseFetchOptions<T> = {
  queryKey: unknown[];
  url: string;
  config?: AxiosRequestConfig;
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;
};

export function useFetch<T = any>({
  queryKey,
  url,
  config,
  options,
}: UseFetchOptions<T>) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const response = await axiosInstance.get<T>(url, config);
      return response.data;
    },
    ...options,
  });
}
