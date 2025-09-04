
import type { IQueryParams } from "../../types/interface/table.interface";
import type { IUpdateUser, IUser, IUserData, } from "../../types/interface/user.interface";
import { apiClient } from "../client/client";



export const userApi = {

    getAllUsers: (queryParams: IQueryParams) => {
        const { currentPage, filters } = queryParams;

        const params = new URLSearchParams();
        params.append('currentPage', String(currentPage));

        if (
            filters?.value !== undefined &&
            (typeof filters.value === 'string' || typeof filters.value === 'number')
        ) {
            params.append(filters.field, String(filters.value));
        }
        return apiClient
            .get<IUserData>(`/users?${params.toString()}`)
            .then((response) => response.data);
    },


    create: (queryParam: IUser) => {
        return apiClient.post<IUserData>('/users', queryParam).then((response => response.data))

    },

    update: (updatedData: IUpdateUser) => {
        const { id, ...payload } = updatedData;
        return apiClient
            .patch<IUser>(`/users/${id}`, payload)
            .then((response) => response.data);
    }
}