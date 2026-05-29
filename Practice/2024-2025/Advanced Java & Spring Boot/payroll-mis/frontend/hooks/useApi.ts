import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseApiOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number | boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

export const useApi = <TData, TError = AxiosError>(
  key: string | string[],
  fn: () => Promise<TData>,
  options?: UseApiOptions
) => {
  return useQuery<TData, TError>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: fn,
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 minutes
    gcTime: options?.cacheTime ?? 1000 * 60 * 10, // 10 minutes
    retry: options?.retry ?? 1,
    ...options,
  });
};

export const useMutationApi = <TData, TVariables, TError = AxiosError>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
    invalidateQueries?: string | string[];
  }
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    onSuccess: (data) => {
      if (options?.invalidateQueries) {
        const keys = Array.isArray(options.invalidateQueries)
          ? options.invalidateQueries
          : [options.invalidateQueries];

        keys.forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: Array.isArray(key) ? key : [key],
          });
        });
      }
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
