import type { BaseOptionType } from "antd/es/select"

export type $option<T extends string | number | boolean | object = string> = BaseOptionType & {
    icon?: React.ReactNode;
    label: string;
    value: T;
};


export interface IStatusData {
    id: number | string
    status: string
}
