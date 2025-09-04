import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { IAuthState } from "../types/interface/auth.interface";
import type { IFilter } from "../types/interface/table.interface";
import type { ITenantState } from "../types/interface/tenant.interface";

type ITableFilterState = {
  [fieldName: string]: IFilter
}

interface FilterStore {
  filters: ITableFilterState
  setFilter: (filter: IFilter) => void
  removeFilter: (field: string) => void
  clearAllFilters: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {},

  setFilter: (filter) =>
    set((state) => ({
      filters: { ...state.filters, [filter.field]: filter }
    })),

  removeFilter: (field) =>
    set((state) => {
      const { [field]: _, ...rest } = state.filters
      console.log(_)
      return { filters: rest }
    }),

  clearAllFilters: () => set({ filters: {} }),
}))

export const useTenantStore = create<ITenantState>()(
  devtools((set) => ({
    tenant: null,
    setTenant: (tenant) => set({ tenant }),
  }))
);


export const useAuthStore = create<IAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),

  }))
);
