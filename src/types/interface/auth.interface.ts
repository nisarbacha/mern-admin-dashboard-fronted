import type { IUser } from "./user.interface";

export interface ICredential {
    email: string;
    password: string;
    remember?: boolean;
    role?: string
}

export interface IAuthState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    logout: () => void;
}
