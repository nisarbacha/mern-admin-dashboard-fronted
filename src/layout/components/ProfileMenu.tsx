import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, message, Space } from 'antd';
import React from 'react';
import { credentialApi } from '../../services/api/auth.api';
import { useAuthStore } from '../../store';



const ProfileMenu: React.FC = () => {
    const { user, logout: logoutFromStore } = useAuthStore();

    const { mutate: logoutFn } = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            await credentialApi.logout;
        },
        onSuccess: async () => {
            logoutFromStore();
            return
        }
    });
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: `${user?.firstName} ${user?.lastName}`,

        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: `${user?.email}`,
            icon: <UserOutlined />,

        },
        {
            key: '3',
            label: `${user?.role}`,
            icon: <SettingOutlined />,
        },
        {
            key: '4',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => {
                logoutFn();
                message.success('You have been logged out successfully.');
            }

        },
    ];
    return (
        <Dropdown menu={{ items }} trigger={['hover']} >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar size="default" icon={<UserOutlined />} />
                </Space>
            </a>
        </Dropdown>

    )
}
export default ProfileMenu;