import type { Roles } from "../../constant/global.constant";
import type { ITenant } from "./tenant.interface";

export type ROLES = typeof Roles[keyof typeof Roles];

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;
    tenant?: ITenant
}

export interface IUserData {
    total: number,
    data: IUser[]
}

export interface ICreateUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;
    password?: string | number
    conformPassword?: string | number
    tenantId?: number
}



export interface IUpdateUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: ROLES;
    tenantId?: number
}