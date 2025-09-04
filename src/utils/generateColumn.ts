import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { ReactNode } from 'react';

export type CustomColumn<T, K extends keyof T = keyof T> = {
    key?: K | string;
    title: string;
    render?: (value: T[K] | React.ReactNode, record: T, index: number) => React.ReactNode;
    visible?: boolean;
    width?: number | string;
    sorter?: boolean | ((a: T, b: T) => number);
    align?: 'left' | 'right' | 'center';
    filters?: { text: string; value: string | number | boolean }[];
    onFilter?: (value: React.Key | boolean, record: T) => boolean;
    filterDropdown?: ColumnType<T>['filterDropdown'];
    filterIcon?: ColumnType<T>['filterIcon'];
    filteredValue?: ColumnType<T>['filteredValue'];
};

// Helper to safely access nested keys
function getNestedValue(obj: unknown, path: string): unknown {
    if (typeof obj !== 'object' || obj === null) return undefined;

    return path.split('.').reduce<unknown>((acc, key) => {
        if (typeof acc === 'object' && acc !== null && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
}

export function generateColumns<T>(columns: CustomColumn<T>[]): ColumnsType<T> {
    return columns
        .filter(col => col.visible !== false)
        .map(col => {
            const key = col.key ?? 'id';
            const dataIndex = key as string;

            const column: ColumnType<T> = {
                key: dataIndex,
                dataIndex,
                title: col.title,
                render: col.render ?? ((_, record) => {
                    const value = getNestedValue(record, dataIndex);
                    return String(value ?? 'N/A');
                }),
                width: col.width,
                sorter: col.sorter,
                align: col.align,
                filters: col.filters,
                onFilter: col.onFilter,
                filterDropdown: col.filterDropdown,
                filterIcon: col.filterIcon,
                filteredValue: col.filteredValue,
            };

            return column;
        });
}

