// hooks/auth.ts
import { keepPreviousData, useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { userApi } from '../../../services/api/user.api';
import type { IUpdateUser, IUser, IUserData, } from '../../../types/interface/user.interface';
import type { IQueryParams } from '../../../types/interface/table.interface';




export const useGetAllUsersQuery = (
    queryParams: IQueryParams,
    config?: Omit<UseQueryOptions<IUserData, Error>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<IUserData, Error>({
        queryKey: ['users', queryParams],
        queryFn: () => userApi.getAllUsers(queryParams),
        placeholderData: keepPreviousData,
        staleTime: Infinity,     // never mark as stale, so it won't refetch automatically
        refetchOnWindowFocus: false, // prevent refetch on window/tab focus
        refetchOnMount: false,       // prevent refetch when component mounts
        refetchOnReconnect: false,   // prevent refetch on reconnect
        ...config,


    });
};

export const useCreateUsersMutation = (
    config?: UseMutationOptions<IUserData, Error, IUser, unknown>,
) => {
    return useMutation<IUserData, Error, IUser>({
        mutationFn: (queryPrams: IUser) => userApi.create(queryPrams),
        ...config,
    });
};


export const useUpdateUsersMutation = (
    config?: UseMutationOptions<IUser, Error, IUpdateUser, unknown>,
) => {
    return useMutation<IUser, Error, IUpdateUser>({
        mutationFn: (updatedData: IUpdateUser) => userApi.update(updatedData),
        ...config,
    });
};