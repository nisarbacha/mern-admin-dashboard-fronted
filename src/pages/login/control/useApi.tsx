// hooks/auth.ts
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { credentialApi } from '../../../services/api/auth.api';
import type { ICredential, } from '../../../types/interface/auth.interface';
import type { IUser } from '../../../types/interface/user.interface';

// Login mutation
export const useLoginMutation = (
  config?: UseMutationOptions<ICredential, Error, ICredential, unknown>,
) =>
  useMutation<ICredential, Error, ICredential>({
    mutationFn: (queryParams: ICredential) => credentialApi.login(queryParams),
    ...config,
  });

export const useLogoutMutation = (
  config?: UseMutationOptions<void, Error, void, unknown>,
) =>
  useMutation<void, Error, void>({
    mutationFn: () => credentialApi.logout(), // <- logout should not take params
    ...config,
  });

// Self query (disabled by default)
export const useSelfQuery = (
  config?: Omit<UseQueryOptions<IUser, Error>, 'queryKey' | 'queryFn'>,
) =>
  useQuery<IUser, Error>({
    queryKey: ['selfData'],
    queryFn: credentialApi.self,
    enabled: false,
    staleTime: Infinity,     // never mark as stale, so it won't refetch automatically
    refetchOnWindowFocus: false, // prevent refetch on window/tab focus
    refetchOnMount: false,       // prevent refetch when component mounts
    refetchOnReconnect: false,
    ...config,
  });
