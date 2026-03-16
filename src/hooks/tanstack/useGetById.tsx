import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";

type UseGetByIdOptions<TData = any> = {
  url: string; 
  id?: string | number; 
  config?: AxiosRequestConfig;
  options?: Omit<
    UseQueryOptions<TData, Error>,
    "queryKey" | "queryFn"
  >;
};

function getKeyFromUrl(url: string) {
  const clean = url.split("?")[0];
  const segments = clean.split("/").filter(Boolean);
  return segments[segments.length - 1];
}

export function useGetById<TData = any>({
  url,
  id,
  config,
  options,
}: UseGetByIdOptions<TData>) {
  const key = getKeyFromUrl(url);

  return useQuery<TData, Error>({
    queryKey: [key, id],

    enabled: Boolean(id),

    queryFn: async () => {
      const response = await axiosInstance.get<TData>(
        `${url}/${id}`,
        config,
      );
      return response.data;
    },

    ...options,
  });
}
