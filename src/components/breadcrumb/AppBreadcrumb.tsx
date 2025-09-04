// src/components/Breadcrumb/AppBreadcrumb.tsx
import { Breadcrumb } from 'antd';
import { useBreadcrumbItems } from './useBreadcrumbItems';

const AppBreadcrumb = () => {
    const items = useBreadcrumbItems();

    return <Breadcrumb items={items} />;
};

export default AppBreadcrumb;
