import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";

type UsePostOptions<TData = any, TVariables = any> = {
  url: string;
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TData, Error, TVariables>;
};


function getQueryKeyFromUrl(url: string) {
  const clean = url.split("?")[0];
  const segments = clean.split("/").filter(Boolean);
  return [segments[segments.length - 1]];
}

export function usePost<TData = any, TVariables = any>({
  url,
  config,
  options,
}: UsePostOptions<TData, TVariables>) {
  const queryClient = useQueryClient();
  const queryKey = getQueryKeyFromUrl(url);

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await axiosInstance.post<TData>(url, variables, config);
      return response.data;
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
    },

    ...options,
  });
}
