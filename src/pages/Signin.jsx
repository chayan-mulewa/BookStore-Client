import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Form } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IsValidToken } from '../utils/index';
import { Server } from '../config/index';
import axios from 'axios';

const Signin = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (document.cookie.includes('token')) {
                    const isValidTokenResult = await IsValidToken();
                    if (!isValidTokenResult) {
                        navigate('/signin');
                    } else {
                        navigate('/');
                    }
                } else {
                    navigate('/signin');
                }
            } catch (error) {
                navigate('/signin');
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!username || !password) {
            return; // Don't submit if username or password is empty
        }
        setIsLoading(true);
        try {
            const response = await axios.post(Server.authURL+'/signin', {
                username: username,
                password: password,
                role: 'user'
            });
            if (response.status === 200) {
                setUsername('');
                setPassword('');
                const token = response.data.token;
                document.cookie = `token=${token}; path=/`;
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
            const { data } = error.response;
            if (data.error === 'username') {
                form.setFields([
                    { name: 'username', errors: [data.message] }
                ]);
            } else if (data.error === 'password') {
                form.setFields([
                    { name: 'password', errors: [data.message] }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Form form={form} onFinish={handleSubmit}>
                <div style={{ width: 300, padding: '2rem', border: '1px solid #d9d9d9', borderRadius: '2px', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Typography.Title level={4}>Sign In</Typography.Title>
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder='Password' iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <div className='w-full flex flex-col gap-6 justify-center items-center text-center' >
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }} loading={isLoading}>{!isLoading && 'Sign In'}</Button>
                        <Typography.Text>Or</Typography.Text>
                        <Button type='primary' className='w-full flex justify-center items-center' onClick={() => navigate('/signup')}>Sign Up</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Signin;
