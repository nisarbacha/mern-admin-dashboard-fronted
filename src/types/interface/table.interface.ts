import type { SUPPORTED_CONDITIONS } from "../../constant/table.constant"
import type { Nullable } from "./global.interface"

export interface IQueryParams {
    currentPage: number;
    perPage: number;
    total?: number;
    filters?: IFilter
}
// Make T default to `Record<string, unknown>` instead of `{}` to avoid unsafe empty object type
export type TBaseRow<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    id: string
    createdAt: string
    updatedAt: Nullable<string>
    deletedAt: Nullable<string>
    createdBy: Nullable<string>
    updatedBy: Nullable<string>
}

// Stronger typing for filter value and sFilter fields
export interface IFilter<TValue = unknown, TSFilter = unknown> {
    field: string
    label?: string
    value?: TValue
    condition: (typeof SUPPORTED_CONDITIONS)[keyof typeof SUPPORTED_CONDITIONS]
    sFilter?: TSFilter
}

// Use generic types instead of `any`
export type TUseFiltersReturnType<
    TValue = unknown,
    TSFilter = unknown
> = [
        IFilter<TValue, TSFilter>[],
        {
            addFilter: (...v: IFilter<TValue, TSFilter>[]) => void
            updateFilters: (v: IFilter<TValue, TSFilter>[]) => void
            clearFilter: (field?: string) => void
        },
    ]


export type TUseFilters = (
    filterKey: string,
    options?: {
        trackedFilters?: IFilter[]
        dispatch?: (filters: IFilter[]) => void
        useLocalStorages?: boolean
    },
) => TUseFiltersReturnType

// export type TBaseTableState = typeof BASE_TABLE_STATE

export interface IColumnProps {
    id: string
    content: string
    notEditable?: boolean
}

export interface IColumnConfig {
    visible: IColumnProps[]
    hidden: IColumnProps[]
    fixed?: IColumnProps[]
    visibleOrder: string[]
}

export interface IAgentDevice {
    key: React.Key
    systemName?: string
    type?: string
    brand?: string
    lastIpAddress?: string
    appVersion?: string
    systemVersion?: string
    lastUsed?: string
    device?: string
    firstInstallTime?: string
}

export interface IColumnHIstory {
    updatedAt: string
    ipAddresses: string
    country: string
    city: string
    regionName: string
    isp: string
    lat: string
    lon: string
    timezone: string
    agentId: string
    uniqueId: string
}
export interface IColumnActivity {
    updatedAt: string
    ipAddresses: string
    type: string
    updatedBy: string
}

// export interface ICreateTableColumnPreference {
//     tableName: TableNames
//     templateName: string
//     agentId?: string | null
//     columns: ITableColumnsObj
// }

// export interface ITableColumnTemplate extends IBaseRow, ICreateTableColumnPreference { }

// export interface ITableColumnsObj {
//     fixed?: string[]
//     visible?: string[]
// }
