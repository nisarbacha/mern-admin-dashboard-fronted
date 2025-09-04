
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Flex, Layout, Space, Tag, theme } from 'antd';
import { useState } from 'react';
import { Navigate, Outlet, useLocation, useMatches } from 'react-router-dom';
import AppBreadcrumb from '../components/breadcrumb/AppBreadcrumb';
import { Roles } from '../constant/global.constant';
import MainMenu from './components/MainMenu';
import Notifications from './components/Notifications';
import ProfileMenu from './components/ProfileMenu';
import SettingMenu from './components/SettingMenu';
import { useAuthStore } from '../store';
import '../index.css';

const { Header, Sider, Content, Footer } = Layout;

const AuthLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, } = useAuthStore()
    const location = useLocation()
    const { token: { colorBgContainer, borderRadiusLG, } } = theme.useToken();

    const matches = useMatches();

    const currentMatch = matches[matches.length - 1];
    const showBreadcrumb =
        currentMatch
            && 'handle' in currentMatch
            && currentMatch.handle
            && typeof currentMatch.handle === 'object'
            && currentMatch.handle !== null
            && 'showBreadcrumb' in currentMatch.handle
            ? (currentMatch.handle as { showBreadcrumb?: boolean }).showBreadcrumb
            : true;


    if (user === null) {
        return <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={true} />
    }

    return (
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
                <Flex vertical justify="space-between" style={{ height: '100%' }}>
                    <Space direction='vertical'>
                        <div className={collapsed ? "logo-horizontal" : "logo-vertical"} />
                        <MainMenu />
                    </Space>
                    <SettingMenu />
                </Flex>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Flex align='center' justify='space-between' wrap >
                        <Space>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            {user.role === Roles.MANAGER && <Tag color='green' style={{
                                padding: '2px 8px',
                                fontWeight: 500,
                                borderRadius: '8px',
                            }}>{user?.tenant?.name}</Tag>}
                        </Space>
                        <Space style={{ paddingRight: '30px' }} size={'large'}>
                            <Notifications />
                            <ProfileMenu />
                        </Space>

                    </Flex>
                </Header>
                {showBreadcrumb && (
                    <div style={{ padding: '0 24px', marginTop: '12px' }}>
                        <AppBreadcrumb />
                    </div>
                )}
                <Content
                    style={{
                        margin: '16px',
                        padding: 12,
                        // minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', padding: '4px' }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout >
    );
};



export default AuthLayout