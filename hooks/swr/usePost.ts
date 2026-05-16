// hooks/usePost.ts
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { postFetcher } from "@/lib/fetchers/postFetcher";

type UsePostOptions = {
  revalidateKey?: string | string[];
};

export const usePost = (url: string, options?: UsePostOptions) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    url,
    postFetcher,
    {
      onSuccess: () => {
        if (!options?.revalidateKey) return;

        const keys = Array.isArray(options.revalidateKey)
          ? options.revalidateKey
          : [options.revalidateKey];

        keys.forEach((key) => mutate(key));
      },
    },
  );

  return {
    data,
    isLoading: isMutating,
    isError: error,
    mutate: trigger,
  };
};
