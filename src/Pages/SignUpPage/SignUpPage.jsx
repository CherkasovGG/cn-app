import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import 'antd/dist/reset.css';

import { authClient } from '../../client/client';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        authClient
            .post("/user", values)
            .then((response) => {
                console.log(response)

                messageApi.open({
                    type:'success',
                    content: 'Регистрация прошла успешно!'
                })

                navigate('/auth/signin');
            })
            .catch((error) => {
                let errorMessage = "Неизвестная ошибка! Попробуйте позже.";

                try {
                    errorMessage = error.response.data.detail.error_massage;
                } catch (e) {
                    console.log(e);
                }

                messageApi.open({
                    type: 'error',
                    content: errorMessage
                })
            });
    };

    return (
        <div className="flex column align-items-center justify-content-center w100vw h100vh">
            { contextHolder }
            <Card title="Регистрация" style={{ width: 400 }}>
                <Form
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="Имя пользователя"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваше имя!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Некорректный email!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите ваш пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Form>
                <Button style={{ width: '100%' }} type='default' href='/auth/signin'>
                    Вход
                </Button>
            </Card>
        </div>
    );
};

export default SignUpPage;