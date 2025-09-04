import { SettingOutlined } from '@ant-design/icons';
import type { TablePaginationConfig, TableProps } from 'antd';
import { Button, Flex, Space, Table, theme, Tooltip, Typography } from 'antd';
import type { GetRowKey } from 'antd/es/table/interface';
import React, { useState } from 'react';
import type { IQueryParams } from '../../types/interface/table.interface';
import TableSettingsDrawer from './TableSettingsDrawer';
import { useTableSettingsStore } from '@/store/tableSettings.store';
import FilterTag from './filters/FilterTag';

const { Title } = Typography;

type TablePagination<T extends object> = NonNullable<
    Exclude<TableProps<T>['pagination'], boolean>
>;
type TablePaginationPosition =
    NonNullable<TablePagination<TablePaginationConfig>['position']>[number];

interface AppTableProps<T> extends TableProps<T> {
    enableSettings?: boolean;
    rowKey?: string | keyof T | GetRowKey<T>;
    customTitle?: React.ReactNode | (() => React.ReactNode);
    createButton?: React.ReactNode;
    pageInfo?: IQueryParams;
    setQueryParams?: React.Dispatch<React.SetStateAction<IQueryParams>>;
}

const AppTable = <T extends object>({
    enableSettings = false,
    rowKey = 'id',
    customTitle,
    createButton,
    pageInfo,
    setQueryParams,
    ...props
}: AppTableProps<T>) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const {
        token: { colorPrimary },
    } = theme.useToken();

    // ✅ Use Zustand store instead of local state
    const { settings } = useTableSettingsStore();

    const mergedProps: TableProps<T> = {
        ...props,
        rowKey,
        bordered: settings.bordered,
        size: settings.size,
        rowSelection: settings.rowSelection,
        footer: settings.footerEnabled ? () => 'Here is footer' : undefined,
    };

    const scroll: { x?: number | string; y?: number | string } = {};
    if (settings.yScroll) {
        scroll.y = 465;
    }
    if (settings.xScroll !== 'unset') {
        scroll.x = '100vw';
    }

    return (
        <>
            <Flex align="center" justify="space-between" style={{ paddingBottom: '16px' }}>
                {customTitle && settings.titleEnabled ? (
                    <div style={{ flex: 1 }}>
                        <Title level={2} style={{ margin: 0 }}>
                            {typeof customTitle === 'function' ? customTitle() : customTitle}
                        </Title>
                    </div>
                ) : (
                    <div style={{ flex: 1 }} />
                )}

                <Space size="middle">
                    <FilterTag />
                    {createButton}
                    {enableSettings && (
                        <Tooltip
                            title="Table settings"
                            placement="bottomRight"
                            styles={{
                                body: {
                                    backgroundColor: colorPrimary,
                                    color: '#fff',

                                }
                            }}
                        >
                            <Button
                                // size={settings.size}
                                icon={<SettingOutlined />}
                                onClick={() => setDrawerVisible(true)}
                            />
                        </Tooltip>
                    )}
                </Space>
            </Flex >

            <Table<T>
                {...mergedProps}
                pagination={
                    pageInfo && setQueryParams
                        ? {
                            pageSize: pageInfo.perPage,
                            current: pageInfo.currentPage,
                            total: pageInfo.total,
                            position: [settings.paginationTop, settings.paginationBottom] as TablePaginationPosition[],
                            onChange: (page, pageSize) => {
                                setQueryParams?.((prev) => ({
                                    ...prev,
                                    currentPage: page,
                                    perPage: pageSize,
                                }));
                            },
                        }
                        : props.pagination
                }
                scroll={scroll}
            />

            {/* ✅ Drawer now only needs visible & onClose */}
            <TableSettingsDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
            />
        </>
    );
};

export default AppTable;
