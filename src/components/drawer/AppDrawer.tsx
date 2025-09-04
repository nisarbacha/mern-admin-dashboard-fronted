import type { DrawerProps } from 'antd';
import { Drawer, theme } from 'antd';
import React from 'react';

type Placement = DrawerProps['placement'];

export interface ReusableDrawerProps extends DrawerProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    placement?: Placement;
    width?: string;
    showPlacementOptions?: boolean;
    open?: boolean;            // accept open from parent
    onClose?: () => void;      // accept onClose handler from parent
}

const AppDrawer: React.FC<ReusableDrawerProps> = ({

    width = '700',
    placement = 'right',
    children,
    open,        // controlled open prop
    onClose,     // controlled onClose handler
    ...drawerProps
}) => {
    const { token: { colorBgLayout } } = theme.useToken();
    return (
        <Drawer
            {...drawerProps}
            styles={{ body: { background: colorBgLayout } }}
            width={width}
            placement={placement}
            open={open}
            onClose={onClose}

        >
            {children}
        </Drawer>

    );
};

export default AppDrawer;
