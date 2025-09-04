import type { ColumnType } from "antd/es/table"

export type Nullable<T> = T | null

export interface IColumn<T = unknown> extends ColumnType<T> {
    id?: string
    identifier?: string 
    children?: IColumn<T>[]
}
