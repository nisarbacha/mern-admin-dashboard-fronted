import Icon, { GiftOutlined, HomeOutlined, TeamOutlined, UploadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import RestaurantIcon from '@/assets/icons/RestaurantIcon';
import { Roles } from '@/constant/global.constant';
import { useAuthStore } from '@/store';
import type { ROLES } from '@/types/interface/user.interface';

type MenuItem = Required<MenuProps>['items'][number];

const getMenuItems = (role: ROLES): MenuItem[] => {
    const baseItems: MenuItem[] = [
        {
            key: '/home',
            icon: <HomeOutlined style={{ fontSize: '18px' }} />,
            label: <Link to="/">Home</Link>,
        },

        {
            key: '/products',
            icon: <UploadOutlined style={{ fontSize: '18px' }} />,
            label: 'Products',
        },
        {
            key: '/promos',
            icon: <GiftOutlined style={{ fontSize: '18px' }} />,
            label: 'Promos',
        },
    ];

    const protectedItem: MenuItem[] = [{
        key: '/users',
        icon: <TeamOutlined style={{ fontSize: '18px' }} />,
        label: <Link to="/users">Users</Link>,
    },
    {
        key: '/tenants',
        icon: <Icon component={RestaurantIcon} style={{ fontSize: '18px' }} />,
        label: <Link to="/tenants">Restaurant</Link>,
    },
    ]
    if (role === Roles.ADMIN) {
        const menu = [...baseItems];
        menu.splice(1, 0, ...protectedItem);
        return menu;
    }

    return baseItems;
};

const MainMenu: React.FC = () => {
    const { user } = useAuthStore()
    const location = useLocation()
    const items: MenuItem[] = user ? getMenuItems(user.role as ROLES) : [];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Menu
            onClick={onClick}
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={items}
        />
    );
};

export default MainMenu;
