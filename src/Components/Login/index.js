import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HOSTNAME } from '../../utils/Constants/SystemVars';
import { _fetchLogin } from '../../utils/CallAPI';
import { Notification } from '../../utils/Notification';

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isShowbtnLogin, setisShowbtnLogin] = useState(false);

    const onFinish = async (values) => {
        console.log('values', values);
        setisShowbtnLogin(true);
        const response = await dispatch(_fetchLogin(HOSTNAME, 'api/authen/login', values));
        if (!response.iserror) {
            message.success('Đăng nhập thành công!');
            const pathname = location?.state?.from?.pathname || '/';
            navigate(pathname);
        }
        else {
            setisShowbtnLogin(false);
            message.error(response.message);
            return;
        }
    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                justifyItems : 'center'
            }}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={isShowbtnLogin}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default Login;