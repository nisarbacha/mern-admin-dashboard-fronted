import type { IQueryParams } from "@/types/interface/table.interface"
import type { ICreateTenant, ITenant, ITenantData, IUpdateTenant } from "../../types/interface/tenant.interface"
import { apiClient } from "../client/client"

export const tenantApi = {

    getAllTenants: (queryParams?: IQueryParams) => {
        const { currentPage, filters } = queryParams ?? {}; // ✅ safe fallback
        const params = new URLSearchParams();

        if (
            filters?.value !== undefined &&
            (typeof filters.value === 'string' || typeof filters.value === 'number')
        ) {
            params.append(filters.field, String(filters.value));
        }

        if (currentPage !== undefined) {
            params.append('currentPage', String(currentPage));
        }

        const queryString = params.toString();
        const url = queryString ? `/tenants?${queryString}` : `/tenants`;

        return apiClient.get<ITenantData>(url).then((response) => response.data);
    },


    create: (createTenantData: ICreateTenant) => {
        return apiClient.post<ITenantData>('/tenants', createTenantData).then((response => response.data))
    },

    update: (updatedData: IUpdateTenant) => {
        const { id, ...payload } = updatedData;
        return apiClient
            .patch<ITenant>(`/tenants/${id}`, payload)
            .then((response) => response.data);
    }
}