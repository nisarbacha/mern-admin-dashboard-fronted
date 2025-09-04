import { ROLE_OPTION, Roles } from '../../../constant/global.constant';
import type { IColumn } from '../../../types/interface/global.interface';
import { Button, Tag } from 'antd';
import SingleSelectionFilter from '../../../components/Table/filters/SingleSelectionFilter';
import type { IUser } from '../../../types/interface/user.interface';
import StringOrNumberFilter from '../../../components/Table/filters/StringSearchFilter';
import MultiSelectionFilter from '../../../components/Table/filters/MultiSelectionFilter';
import { useUserDrawerStore } from '@/store/drawer.store';
import { useFilterStore } from '@/store';
import type { $option } from '@/types/interface/option.interface';
import { useGetAllTenantQuery } from '@/pages/tenant/control/useTenantApi';

const useUserColumns = (): IColumn<IUser>[] => {
    const { openDrawer } = useUserDrawerStore();
    const { filters } = useFilterStore();

    const { data: tenantData, isLoading: isTenantLoading } = useGetAllTenantQuery();
    const tenantOption: $option[] =
        tenantData?.data?.map((tenant) => ({
            label: tenant.name,
            value: String(tenant.id), // ✅ ensure string
        })) ?? [];

    const columns: IColumn<IUser>[] = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: 'firstName',
            title: 'First Name',
            dataIndex: 'firstName',
            filteredValue: filters.firstName ? [JSON.stringify(filters.firstName)] : null,
            filterDropdown: ({ setSelectedKeys, confirm }) => (
                <StringOrNumberFilter
                    field="firstName"
                    label="First Name"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]);
                        confirm();
                    }}
                />
            ),
        },
        {
            key: 'lastName',
            title: 'Last Name',
            dataIndex: 'lastName',
            filteredValue: filters.lastName ? [JSON.stringify(filters.lastName)] : null,
            filterDropdown: ({ setSelectedKeys, confirm }) => (
                <StringOrNumberFilter
                    field="lastName"
                    label="Last Name"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]);
                        confirm();
                    }}
                />
            ),
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
            filteredValue: filters.email ? [JSON.stringify(filters.email)] : null,
            filterDropdown: ({ setSelectedKeys, confirm }) => (
                <StringOrNumberFilter
                    field="email"
                    label="Email"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]);
                        confirm();
                    }}
                />
            ),
        },
        {
            key: 'role',
            title: 'Role',
            align: 'center',
            dataIndex: 'role',
            render: (value: string) => <Tag color={value === Roles.ADMIN ? 'green' : 'blue'}>{value}</Tag>,
            filteredValue: filters.role ? [JSON.stringify(filters.role)] : null,
            filterDropdown: ({ setSelectedKeys, confirm }) => (
                <SingleSelectionFilter
                    options={ROLE_OPTION}
                    label="Role"
                    field="role"
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]);
                        confirm();
                    }}
                />
            ),
        },
        {
            key: 'tenant.name',
            title: 'Tenant Name',
            dataIndex: ['tenant', 'name'],
            filteredValue: filters.tenant ? [JSON.stringify(filters.tenant)] : null,
            filterDropdown: ({ setSelectedKeys, confirm }) => (
                <MultiSelectionFilter
                    options={tenantOption}
                    label="Tenant"
                    field="tenant"
                    loading={isTenantLoading}
                    onFinish={(v) => {
                        setSelectedKeys([JSON.stringify(v)]);
                        confirm();
                    }}
                />
            ),
            render: (_, record) => <span>{record.tenant?.name ?? 'N/A'}</span>,
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
export default useUserColumns;