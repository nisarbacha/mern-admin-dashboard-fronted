import { SettingFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const Items: MenuItem[] = [
    {
        key: '1',
        icon: <SettingFilled style={{ fontSize: '18px', }} />,
        label: 'Settings',
    },

];

const SettingMenu: React.FC = () => {

    return (
        <Menu

            defaultSelectedKeys={['6']}
            mode={'inline'}
            items={Items}

        />

    );
};

export default SettingMenu;