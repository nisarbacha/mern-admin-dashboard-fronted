// useBreadcrumbItems.ts
import type { BreadcrumbProps } from 'antd';
import { staticBreadcrumbMap, dynamicBreadcrumbResolvers } from './breadcrumb.config';
import { useLocation, Link } from 'react-router-dom';

export const useBreadcrumbItems = (): BreadcrumbProps['items'] => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(Boolean);

    let accumulatedPath = '';
    const items = pathSnippets.map((segment) => {
        accumulatedPath += `/${segment}`;

        let label = staticBreadcrumbMap[accumulatedPath];

        if (!label) {
            for (const resolver of dynamicBreadcrumbResolvers) {
                const match = accumulatedPath.match(resolver.pattern);
                if (match) {
                    label = resolver.getLabel(match);
                    break;
                }
            }
        }

        return {
            key: accumulatedPath,
            title: label || segment,
        };
    });

    return [
        {
            key: '/',
            title: <Link to="/"> {staticBreadcrumbMap['/'] || 'Home'} </Link>,
        },
        ...items,
    ];

};
