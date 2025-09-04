// src/store/tableSettings.store.ts
import { create } from "zustand";

export type SizeType = "large" | "middle" | "small";

export interface TableSettings {
  bordered: boolean;
  size: SizeType;
  titleEnabled: boolean;
  footerEnabled: boolean;
  paginationTop: "topLeft" | "topCenter" | "topRight" | "none";
  paginationBottom: "bottomLeft" | "bottomCenter" | "bottomRight" | "none";
  rowSelection: object | undefined;
  xScroll?: "unset" | "scroll" | "fixed";
  yScroll?: boolean;
}

interface TableSettingsState {
  settings: TableSettings;
  updateSetting: (
    key: keyof TableSettings,
    value: TableSettings[keyof TableSettings]
  ) => void;
}

// ✅ Default settings
const defaultSettings: TableSettings = {
  bordered: false,
  size: "middle",
  titleEnabled: true,
  footerEnabled: true,
  paginationTop: "topRight",
  paginationBottom: "bottomRight",
  rowSelection: undefined,
  xScroll: "unset",
  yScroll: false,
};

export const useTableSettingsStore = create<TableSettingsState>((set) => {
  // Load from localStorage on init
  const savedSettings = localStorage.getItem("tableSettings");
  const initialSettings: TableSettings = savedSettings
    ? JSON.parse(savedSettings)
    : defaultSettings;

  return {
    settings: initialSettings,
    updateSetting: (key, value) =>
      set((state) => {
        const newSettings = { ...state.settings, [key]: value };
        localStorage.setItem("tableSettings", JSON.stringify(newSettings));
        return { settings: newSettings };
      }),
  };
});
