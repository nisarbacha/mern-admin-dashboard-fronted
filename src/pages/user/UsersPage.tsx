import { Button, } from 'antd';
import { useEffect, useState } from 'react';
import AppTable from '../../components/Table/AppTable';
import type { IUser } from '../../types/interface/user.interface';

import { useUserDrawerStore } from '@/store/drawer.store';
import { useServerPagination } from '../../hooks/useServerPagination';
import { useFilterStore } from '../../store';
import useUserColumns from './components/columnDefinition';
import CreateUpdateUser from './components/CreateUpdateUser';
import { useGetAllUsersQuery } from './control/useUserApi';


const UsersPage = () => {
  const { openDrawer } = useUserDrawerStore();
  const { filters } = useFilterStore();

  // Server pagination state
  const { queryParams, setQueryParams } = useServerPagination();
  // Total kept separately to avoid changing queryKey
  const [total, setTotal] = useState(0);

  // Fetch users
  const { data, isLoading, isFetching } = useGetAllUsersQuery(queryParams);
  const users = data?.data || [];

  // Fetch tenants


  // Update total separately
  useEffect(() => {
    if (data?.total !== undefined) {
      setTotal(data.total);
    }
  }, [data?.total]);

  // Apply filters
  useEffect(() => {
    const activeFilter = filters['role'] || filters['firstName'] || filters['lastName'] || filters['email'];
    setQueryParams(prev => {
      if (prev.filters === activeFilter) return prev;
      return { ...prev, filters: activeFilter };
    });
  }, [filters, setQueryParams]);
  // useEffect(() => {
  //   const roleFilter = filters['role'];
  //   const firstNameFilter = filters['firstName'];
  //   const lastNameFilter = filters['lastName'];
  //   const emailFilter = filters['email'];
  //   const activeFilter = roleFilter || firstNameFilter || lastNameFilter || emailFilter;

  //   setQueryParams((prev) => ({
  //     ...prev,
  //     filters: activeFilter,
  //   }));
  // }, [filters, setQueryParams]);

  const columns = useUserColumns();

  return (
    <>
      <AppTable<IUser>
        customTitle={'User Table'}
        columns={columns}
        loading={isLoading || isFetching}
        dataSource={users}
        enableSettings
        createButton={<Button onClick={() => openDrawer()} type="primary">Create User</Button>}
        pageInfo={{ ...queryParams, total }}
        setQueryParams={setQueryParams}
      />

      <CreateUpdateUser />
    </>
  );
};

export default UsersPage;
