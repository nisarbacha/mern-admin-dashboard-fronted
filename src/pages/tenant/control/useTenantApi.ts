// hooks/auth.ts
import { keepPreviousData, useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';

import type { ICreateTenant, ITenant, ITenantData, IUpdateTenant } from '@/types/interface/tenant.interface';
import { tenantApi } from '@/services/api/tenant.api';
import type { IQueryParams } from '@/types/interface/table.interface';


export const useGetAllTenantQuery = (
    queryParams?: IQueryParams,
    config?: Omit<UseQueryOptions<ITenantData, Error>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ITenantData, Error>({
        queryKey: ['getAllTenant', queryParams],
        queryFn: () => tenantApi.getAllTenants(queryParams),
        placeholderData: keepPreviousData,
        staleTime: Infinity,     // never mark as stale, so it won't refetch automatically
        refetchOnWindowFocus: false, // prevent refetch on window/tab focus
        refetchOnMount: false,       // prevent refetch when component mounts
        refetchOnReconnect: false,
        ...config,
    });
};

export const useCreateTenantMutation = (
    config?: UseMutationOptions<ITenantData, Error, ITenant, unknown>,
) => {
    return useMutation<ITenantData, Error, ITenant>({
        mutationFn: (tenantData: ICreateTenant) => tenantApi.create(tenantData),
        ...config,
    });
};

export const useUpdateTenantMutation = (
    config?: UseMutationOptions<ITenant, Error, IUpdateTenant, unknown>,
) => {
    return useMutation<ITenant, Error, IUpdateTenant>({
        mutationFn: (updatedData: IUpdateTenant) => tenantApi.update(updatedData),
        ...config,
    });
};