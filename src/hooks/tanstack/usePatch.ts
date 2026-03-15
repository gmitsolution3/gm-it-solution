import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "@/lib/axios";

type UsePatchOptions<TData = any, TVariables = any> = {
  url: string;
  config?: AxiosRequestConfig;
  options?: UseMutationOptions<TData, Error, TVariables>;
};

function getQueryKeyFromUrl(url: string) {
  const clean = url.split("?")[0];
  const segments = clean.split("/").filter(Boolean);


  if (segments.length > 1) {
    return [segments[segments.length - 2]];
  }

  return [segments[segments.length - 1]];
}

export function usePatch<TData = any, TVariables = any>({
  url,
  config,
  options,
}: UsePatchOptions<TData, TVariables>) {
  const queryClient = useQueryClient();
  const queryKey = getQueryKeyFromUrl(url);

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await axiosInstance.patch<TData>(url, variables, config);
      return response.data;
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
    },

    ...options,
  });
}
