import { useEffect, type FC } from 'react';
import AppDrawer from '../../../components/drawer/AppDrawer';
import { useTenantDrawerStore } from '@/store/drawer.store';
import { Button, Card, Col, Form, Input, message, Row, Space, type FormProps, } from 'antd';

import type { ICreateTenant, IUpdateTenant } from '@/types/interface/tenant.interface';
import { useCreateTenantMutation, useUpdateTenantMutation } from '../control/useTenantApi';
import { useQueryClient } from '@tanstack/react-query';


// interface IProps {

// }
type FieldType = ICreateTenant | IUpdateTenant

const CreateUpdateTenant: FC = () => {
    const { drawerOpen, closeDrawer, drawerRecord } = useTenantDrawerStore();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();


    const { mutate: createFn } = useCreateTenantMutation({
        onSuccess: async () => {
            message.success('Tenant created successfully.');
            queryClient.invalidateQueries({ queryKey: ['getAllTenant'] })
            closeDrawer()
            form.resetFields()
        }
    })

    const { mutate: updateFn } = useUpdateTenantMutation({
        onSuccess: async () => {
            message.success('Tenant update successfully.');
            queryClient.invalidateQueries({ queryKey: ['getAllTenant'] })
            closeDrawer()
            form.resetFields()
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        // const rest = { ...values };


        if (drawerRecord?.id) {
            console.log('update user not implemented yet')
            const updatedData: IUpdateTenant = {
                ...values,
                id: drawerRecord.id!,
            };
            updateFn(updatedData);
        }
        else {
            console.log('create user not implemented yet')
            createFn(values);
        }

        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log('drawerRecord', drawerRecord);
    useEffect(() => {
        if (drawerOpen) {
            if (drawerRecord) {
                // Prefill with edit data
                form.setFieldsValue({
                    name: drawerRecord.name,
                    address: drawerRecord?.address,

                });
            } else {
                // Reset for create form
                form.resetFields();
            }
        }
    }, [drawerOpen, drawerRecord, form]);
    return (
        <AppDrawer open={drawerOpen}
            onClose={closeDrawer}
            destroyOnHidden
            title={!drawerRecord ? "Create Tenant" : 'Update Tenant'} extra={
                <Space>
                    <Button onClick={() => {
                        form.resetFields();
                        // setUserData(null);
                        closeDrawer();
                    }}>Cancel</Button>
                    <Button type="primary" onClick={form.submit}>
                        OK
                    </Button>
                </Space>
            } >
            <Form
                form={form}
                layout='vertical'
                name="basic"
                initialValues={{
                    name: '',
                    address: '',
                    tenantId: undefined,
                }}
                // variant={'underlined'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Card title='Basic Info'>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Tenant Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your tenant name!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FieldType>
                                label="Tenant address"
                                name="address"
                                rules={[{ required: true, message: 'Please input tenant address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>

                </Card>

            </Form>
        </AppDrawer>
    )
}

export default CreateUpdateTenant