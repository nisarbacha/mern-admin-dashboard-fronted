
import { Button } from 'antd';
import type { IColumn } from '../../../types/interface/global.interface';
import type { ITenant } from '../../../types/interface/tenant.interface';
import { useTenantDrawerStore } from '@/store/drawer.store';
import StringOrNumberFilter from '@/components/Table/filters/StringSearchFilter';




const useTenantColumns = (): IColumn<ITenant>[] => {
    const { openDrawer } = useTenantDrawerStore();


    const columns: IColumn<ITenant>[] = [

        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'name',
            title: 'Tenant Name',
            dataIndex: 'name',
            filterDropdown: ({ setSelectedKeys, confirm, }) => (
                <StringOrNumberFilter
                    label="name"
                    field="name"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]); // store filter state in selectedKeys
                        confirm();
                    }}
                />
            ),
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            filterDropdown: ({ setSelectedKeys, confirm, }) => (
                <StringOrNumberFilter
                    label="address"
                    field="address"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]); // store filter state in selectedKeys
                        confirm();
                    }}
                />
            ),
        },



        {
            title: 'Actions',
            width: 100,
            render: (_, record) => (
                <Button onClick={() => openDrawer(record)}>Edit</Button>
            ),
        },
    ];
    return columns;
};
export default useTenantColumns;
