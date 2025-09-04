
// src/components/TableSettingsDrawer.tsx
import { useTableSettingsStore, type SizeType } from "@/store/tableSettings.store";
import { Drawer, Form, Switch, Radio } from "antd";
import React from "react";
 

interface TableSettingsDrawerProps {
    visible: boolean;
    onClose: () => void;
}

const TableSettingsDrawer: React.FC<TableSettingsDrawerProps> = ({ visible, onClose }) => {
    const { settings, updateSetting } = useTableSettingsStore();

    return (
        <Drawer title="Table Settings" placement="right" width={500} onClose={onClose} open={visible}>
            <Form layout="vertical">
                <Form.Item label="Bordered">
                    <Switch checked={settings.bordered} onChange={(v) => updateSetting("bordered", v)} />
                </Form.Item>
                <Form.Item label="Fixed Header">
                    <Switch checked={!!settings.yScroll} onChange={(v) => updateSetting("yScroll", v)} />
                </Form.Item>
                <Form.Item label="Table Scroll">
                    <Radio.Group value={settings.xScroll} onChange={(e) => updateSetting("xScroll", e.target.value)}>
                        <Radio.Button value="unset">Unset</Radio.Button>
                        <Radio.Button value="scroll">Scroll</Radio.Button>
                        <Radio.Button value="fixed">Fixed Columns</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Row Selection">
                    <Switch checked={!!settings.rowSelection} onChange={(v) => updateSetting("rowSelection", v ? {} : undefined)} />
                </Form.Item>
                <Form.Item label="Title">
                    <Switch checked={settings.titleEnabled} onChange={(v) => updateSetting("titleEnabled", v)} />
                </Form.Item>
                <Form.Item label="Footer">
                    <Switch checked={settings.footerEnabled} onChange={(v) => updateSetting("footerEnabled", v)} />
                </Form.Item>
                <Form.Item label="Size">
                    <Radio.Group value={settings.size} onChange={(e) => updateSetting("size", e.target.value as SizeType)}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="middle">Middle</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Pagination Top">
                    <Radio.Group value={settings.paginationTop} onChange={(e) => updateSetting("paginationTop", e.target.value)}>
                        <Radio.Button value="topLeft">topLeft</Radio.Button>
                        <Radio.Button value="topCenter">topCenter</Radio.Button>
                        <Radio.Button value="topRight">topRight</Radio.Button>
                        <Radio.Button value="none">None</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Pagination Bottom">
                    <Radio.Group value={settings.paginationBottom} onChange={(e) => updateSetting("paginationBottom", e.target.value)}>
                        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
                        <Radio.Button value="bottomCenter">bottomCenter</Radio.Button>
                        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
                        <Radio.Button value="none">None</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default TableSettingsDrawer;

// import { Drawer, Form, Switch, Radio, type TableProps, type TablePaginationConfig, } from 'antd';
// import React from 'react';

// type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
// type TablePaginationPosition = NonNullable<TablePagination<TablePaginationConfig>['position']>[number];
// type SizeType = TableProps<unknown>['size'];
// interface TableSettings {
//     bordered: boolean;
//     size: SizeType;
//     titleEnabled: boolean;
//     footerEnabled: boolean;
//     // position: TablePaginationPosition;
//     paginationTop: TablePaginationPosition,
//     paginationBottom: TablePaginationPosition,
//     rowSelection: TableProps["rowSelection"] | undefined;
//     xScroll?: string;
//     yScroll?: boolean
// }



// interface TableSettingsProps {
//     visible: boolean;
//     onClose: () => void;
//     settings: TableSettings;
//     onChange: (key: string, value: boolean | object | SizeType) => void; // Changed to match your update function
// }

// const TableSettingsDrawer: React.FC<TableSettingsProps> = ({
//     visible,
//     onClose,
//     settings,
//     onChange,
// }) => {
//     return (
//         <Drawer title="Table Settings" placement="right" width={500} onClose={onClose} open={visible}>
//             <Form layout="vertical">
//                 <Form.Item label="Bordered">
//                     <Switch checked={settings.bordered} onChange={(v) => onChange('bordered', v)} />
//                 </Form.Item>
//                 <Form.Item label="Fixed Header">
//                     <Switch checked={!!settings.yScroll} onChange={(v) => onChange('yScroll', v)} />
//                 </Form.Item>
//                 <Form.Item label="Table Scroll">
//                     <Radio.Group value={settings.xScroll} onChange={(e) => onChange('xScroll', e.target.value)}>
//                         <Radio.Button value="unset">Unset</Radio.Button>
//                         <Radio.Button value="scroll">Scroll</Radio.Button>
//                         <Radio.Button value="fixed">Fixed Columns</Radio.Button>
//                     </Radio.Group>
//                 </Form.Item>
//                 <Form.Item label="Row Selection">
//                     <Switch checked={!!settings.rowSelection} onChange={(v) => onChange('rowSelection', v ? {} : undefined)} />
//                 </Form.Item>
//                 <Form.Item label="Title">
//                     <Switch checked={settings.titleEnabled} onChange={(v) => onChange('titleEnabled', v)} />
//                 </Form.Item>
//                 <Form.Item label="Footer">
//                     <Switch checked={settings.footerEnabled} onChange={(v) => onChange('footerEnabled', v)} />
//                 </Form.Item>
//                 <Form.Item label="Size">
//                     <Radio.Group
//                         value={settings.size}
//                         onChange={(e) => onChange('size', e.target.value as SizeType)}
//                     >
//                         <Radio.Button value="large">Large</Radio.Button>
//                         <Radio.Button value="middle">Middle</Radio.Button>
//                         <Radio.Button value="small">Small</Radio.Button>
//                     </Radio.Group>
//                 </Form.Item>
//                 <Form.Item label="Pagination Top">
//                     <Radio.Group
//                         value={settings.paginationTop}
//                         onChange={(e) => onChange('paginationTop', e.target.value)}
//                     >
//                         <Radio.Button value="topLeft">topLeft</Radio.Button>
//                         <Radio.Button value="topCenter">topCenter</Radio.Button>
//                         <Radio.Button value="topRight">topRight</Radio.Button>

//                         <Radio.Button value={'none'}>None</Radio.Button>
//                     </Radio.Group>
//                 </Form.Item>

//                 <Form.Item label="Pagination Bottom">
//                     <Radio.Group
//                         value={settings.paginationBottom}
//                         onChange={(e) => onChange('paginationBottom', e.target.value)}
//                     >
//                         <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
//                         <Radio.Button value="bottomCenter">bottomCenter</Radio.Button>
//                         <Radio.Button value="bottomRight">bottomRight</Radio.Button>
//                         <Radio.Button value={'none'}>None</Radio.Button>
//                     </Radio.Group>
//                 </Form.Item>
//             </Form>
//         </Drawer>
//     );
// };

// export default TableSettingsDrawer;