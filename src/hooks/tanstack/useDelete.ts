import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";

type UseDeleteOptions<TData = any, TVariables = string | number> = {
  url: string; 
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TData, Error, TVariables>;
};


function getQueryKeyFromUrl(url: string) {
  const clean = url.split("?")[0];
  const segments = clean.split("/").filter(Boolean);
  return [segments[segments.length - 1]];
}

export function useDelete<TData = any, TVariables = string | number>({
  url,
  config,
  options,
}: UseDeleteOptions<TData, TVariables>) {
  const queryClient = useQueryClient();
  const queryKey = getQueryKeyFromUrl(url);

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete<TData>(
        `${url}/${id}`,
        config
      );
      return response.data;
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });


    },

    ...options,
  });
}