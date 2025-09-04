export interface ITenantState {
    tenant: ITenant | null;
    setTenant: (user: ITenant) => void;
}


export interface ITenant {
    id: number;
    name: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITenantData {
    total: number,
    data: ITenant[]
}


export interface ICreateTenant {
    id: number;
    name: string;
    address?: string;
    tenantId?: number
}



export interface IUpdateTenant {
    id: number;
    name: string;
    address?: string;
}