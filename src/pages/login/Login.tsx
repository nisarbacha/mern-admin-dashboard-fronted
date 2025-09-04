import type { FormProps } from 'antd';
import { Button, Checkbox, Layout, Form, Input, Card, message } from 'antd';
import { useLoginMutation, useLogoutMutation, useSelfQuery } from './control/useApi';
import type { ICredential } from '../../types/interface/auth.interface';
import { useAuthStore } from '../../store';
import { usePermission } from '../../hooks/usePermmission';

const Login = () => {
    const { isAllowed } = usePermission()
    const { setUser, logout } = useAuthStore()

    const { refetch: selfRefetch } = useSelfQuery();

    const { mutate: logoutFn } = useLogoutMutation({
        onSuccess: async () => {
            message.error('You are not authorized to access this application.');
            logout();
        }
    })

    const { mutate: loginFn, isPending } = useLoginMutation({
        onSuccess: async (data) => {
            const role = data.role;
            if (!role) return;

            if (!isAllowed(role)) {
                logoutFn();
                return;
            }

            const { data: userData } = await selfRefetch();

            if (userData) {
                setUser(userData);
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });



    const onFinish: FormProps<ICredential>['onFinish'] = (values) => {
        console.log('Success:', values);
        loginFn(values)
    };

    const onFinishFailed: FormProps<ICredential>['onFinishFailed'] = (error) => {
        console.error('Login failed:', error);
        message.error('Login failed. Please check your credentials.');
    };

    return (
        <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="Login" variant="borderless" style={{ width: 400 }}>
                <Form
                    name="form"
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item<ICredential>
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="please enter your username" />
                    </Form.Item>

                    <Form.Item<ICredential>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder='Please input your password' />
                    </Form.Item>

                    <Form.Item<ICredential> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" block loading={isPending}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </Layout>
    )
}

export default Login