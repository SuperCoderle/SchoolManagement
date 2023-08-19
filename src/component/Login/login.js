import { Form, Checkbox, Input, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.css';
import customAxios from '../../lib/axios';
import { useEffect, useState } from 'react';
import Loading from '../Layout/loading/loading';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const confirm = async (values) => {
        const hide = messageApi.loading("Đang đăng nhập...", 0);
        const data = {
            "username": values.username,
            "password": values.password
        };

        await customAxios.post("login", data).then(
            (res) => {
                setTimeout(() => {
                    if (res != null) {
                        hide();
                        messageApi.success("Đăng nhập thành công.", 1000);
                        navigate("/home");
                    };
                }, 600);
            }
        );
    };

    return (
        <>
            <Loading className={loading ? "enable" : "disable"}/>

            {contextHolder}

            <div className='login desktop'>
                <div className='container-form'>
                    <h2 className='mb-5 text-center'>Login</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={confirm}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className='float-start'>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot float-end" href="/">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button w-100 rounded-0">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;