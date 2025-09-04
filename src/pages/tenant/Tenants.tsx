
import { Button, } from 'antd';
import AppTable from '../../components/Table/AppTable';
import type { ITenant } from '../../types/interface/tenant.interface';
import { useGetAllTenantQuery } from './control/useTenantApi';
import CreateUpdateTenant from './components/CreateUpdateTenant';
import { useTenantDrawerStore } from '@/store/drawer.store';
import useTenantColumns from './components/columnDefinition';
import { useEffect, useState } from 'react';
import { useFilterStore } from '@/store';
import { useServerPagination } from '@/hooks/useServerPagination';


const Tenants = () => {
    const { openDrawer } = useTenantDrawerStore();
    const { filters } = useFilterStore();
    const { queryParams, setQueryParams } = useServerPagination();
    const [total, setTotal] = useState(0);

    const { data, isLoading, isFetching } = useGetAllTenantQuery(queryParams);
    const extractData = data?.data || []

    useEffect(() => {
        if (data?.total !== undefined) {
            setTotal(data.total);
        }
    }, [data?.total]);

    useEffect(() => {
        const tenantNameFilter = filters['name'];
        const addressFilter = filters['address'];
        const activeFilter = addressFilter;
        setQueryParams((prev) => ({
            ...prev,
            filters: activeFilter || tenantNameFilter,
        }));
    }, [filters, setQueryParams]);

    const columns = useTenantColumns();

    return (
        <>

            <AppTable<ITenant>
                customTitle={'Tenant Table'}
                columns={columns}
                loading={isLoading || isFetching}
                dataSource={extractData}
                enableSettings
                createButton={<Button onClick={() => openDrawer()} type='primary'>Create Tenant</Button>}
                pageInfo={{ ...queryParams, total }}
                setQueryParams={setQueryParams}
            />
            <CreateUpdateTenant />
        </>
    )
};

export default Tenants