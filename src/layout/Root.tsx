import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { credentialApi } from '../services/api/auth.api';
import { useAuthStore } from '../store';
import { useEffect } from 'react';
import { Flex, Spin } from 'antd';
import { AxiosError } from 'axios';
import type { IUser } from '../types/interface/user.interface';

const contentStyle: React.CSSProperties = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};

const content = <div style={contentStyle} />;
const Root = () => {
    const { setUser } = useAuthStore();


    // FIXME:
    // README: something
    const { data, isLoading } = useQuery<IUser, Error>({
        queryKey: ['self-data'],
        queryFn: () => credentialApi.self(),
        retry: (failureCount, error) => {
            if (error instanceof AxiosError && error.response?.status) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: Infinity,     // never mark as stale, so it won't refetch automatically
        refetchOnWindowFocus: false, // prevent refetch on window/tab focus
        refetchOnMount: false,       // prevent refetch when component mounts
        refetchOnReconnect: false,
    });

    useEffect(() => {
        console.log("useEffect triggered with data in root:", data);
        if (data) {
            setUser(data);
        }
    }, [data, setUser]);

    if (isLoading) {
        return <Flex gap="middle" vertical align="center" justify="center" style={{ height: '100vh' }}>
            <Spin tip="Loading" size="large">
                {content}
            </Spin>

        </Flex >
    }

    return <Outlet />
};

export default Root;
