import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, Card, Col, Form, Input, message, Row, Select, Space } from 'antd';
import { useEffect } from 'react';
import AppDrawer from '../../../components/drawer/AppDrawer';
import { ROLE_OPTION, Roles } from '../../../constant/global.constant';
import type { $option } from '../../../types/interface/option.interface';
import type { ICreateUser, IUpdateUser, } from '../../../types/interface/user.interface';
import { useCreateUsersMutation, useUpdateUsersMutation } from '../control/useUserApi';
import { useUserDrawerStore } from '@/store/drawer.store';
import { useGetAllTenantQuery } from '@/pages/tenant/control/useTenantApi';

type FieldType = ICreateUser | IUpdateUser

const CreateUpdateUser = () => {
    const [form] = Form.useForm()
    const selectedRole = Form.useWatch('role', form);
    const { drawerOpen, closeDrawer, drawerRecord } = useUserDrawerStore();
    const queryClient = useQueryClient();

    const { data: tenantData, isLoading: isTenantLoading } = useGetAllTenantQuery();
    const tenantOption: $option<number>[] | undefined = tenantData?.data?.map((tenant) => ({
        label: tenant.name,
        value: tenant.id,
    }));

    const { mutate: createFn } = useCreateUsersMutation({
        onSuccess: async () => {
            message.success('User created successfully.');
            queryClient.invalidateQueries({ queryKey: ['users'] })
            closeDrawer()
            form.resetFields()
        }
    })

    const { mutate: updateFn } = useUpdateUsersMutation({
        onSuccess: async () => {
            message.success('User update successfully.');
            queryClient.invalidateQueries({ queryKey: ['users'] })
            closeDrawer()
            form.resetFields()
        }
    })



    useEffect(() => {
        if (drawerOpen) {
            if (drawerRecord) {
                form.setFieldsValue({
                    firstName: drawerRecord.firstName,
                    lastName: drawerRecord.lastName,
                    email: drawerRecord.email,
                    role: drawerRecord.role,
                    tenantId: drawerRecord.tenant?.id,
                });
            } else {
                form.resetFields();
            }
        }
    }, [drawerOpen, drawerRecord, form]);



    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        const rest = { ...values };
        if ('conformPassword' in rest) {
            delete rest.conformPassword;
        }

        if (drawerRecord?.id) {

            const updatedData: IUpdateUser = {
                ...rest,
                id: drawerRecord.id!,
            };
            updateFn(updatedData);
        }
        else {

            createFn(rest);
        }


    };




    return (
        <AppDrawer open={drawerOpen}
            onClose={closeDrawer}
            title={!drawerRecord ? "Create User" : 'Update User'}
            extra={
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
                    firstName: '',
                    lastName: '',
                    email: '',
                    role: undefined,
                    tenantId: undefined,
                }}
                // variant={'underlined'}
                onFinish={onFinish}

            >
                <Space direction='vertical' size='large' >
                    <Card title='Basic Info'>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="First Name"
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Last Name"
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please input your lastName!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!', type: 'email' },]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Card>
                    {!drawerRecord && <Card title='Security Info'>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Conform password"
                                    name="conformPassword"
                                    // rules={[{ required: true, message: 'Please input your conform password!' }]}
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The password do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                    </Card>}
                    <Card title='Role Info'>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    label="Role"
                                    name="role"
                                    rules={[{ required: true, message: 'Please input your role!' }]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a role"
                                        optionFilterProp="label"
                                        onChange={() => { }}
                                        // onSearch={onSearch}
                                        options={ROLE_OPTION}
                                    />
                                </Form.Item>
                            </Col>
                            {selectedRole === Roles.MANAGER && (
                                <Col span={24}>
                                    <Form.Item<FieldType>
                                        label="Tenant"
                                        name="tenantId"
                                        rules={[{ required: true, message: 'Please input your tenant!' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Select a tenant"
                                            optionFilterProp="label"
                                            onChange={() => { }}
                                            loading={isTenantLoading}
                                            options={tenantOption}
                                        />
                                    </Form.Item>
                                </Col>)}
                        </Row>
                    </Card>
                </Space>
                {/* <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>

        </AppDrawer >
    )
}

export default CreateUpdateUser