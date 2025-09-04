// src/store/drawer.store.ts
import { create } from 'zustand';
import type { IUser } from '@/types/interface/user.interface';
import type { ITenant } from '@/types/interface/tenant.interface';
export interface DrawerState<T = unknown> {
    drawerOpen: boolean;
    drawerRecord: T | null;
    openDrawer: (record?: T) => void;
    closeDrawer: () => void;
}

/**
 * Generic drawer store creator
 * @returns Zustand store for a drawer
 */
export const createDrawerStore = <T>() =>
    create<DrawerState<T>>((set) => ({
        drawerOpen: false,
        drawerRecord: null,
        openDrawer: (record?: T) => set({ drawerOpen: true, drawerRecord: record ?? null }),
        closeDrawer: () => set({ drawerOpen: false, drawerRecord: null }),
    }));

// Example: user drawer store

export const useUserDrawerStore = createDrawerStore<IUser>();
export const useTenantDrawerStore = createDrawerStore<ITenant>();

// Example: product drawer store
// import type { IProduct } from '@/types/interface/product.interface';
// export const useProductDrawerStore = createDrawerStore<IProduct>();
