import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, GoogleOutlined } from '@ant-design/icons';
import { IsValidToken } from '../../utils/index';
import { Server } from '../../config/index';
import axios from 'axios';

const { Title } = Typography;

const AdminSignUp = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (document.cookie.includes('token')) {
          const isValidTokenResult = await IsValidToken();
          if (!isValidTokenResult) {
            navigate('/admin/signup');
          } else {
            navigate('/');
          }
        } else {
          navigate('/admin/signup');
        }
      } catch (error) {
        navigate('/admin/signup');
      }
    };
    fetchData();
  }, []);


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(Server.authURL + '/signup', {
        full_name: fullName,
        email: email,
        username: username,
        password: password,
        secretKey: secretKey,
        role: 'admin'
      }, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.status === 201) {
        navigate('/admin/signin');
        return;
      }
    } catch (error) {
      const { data } = error.response;
      if (data.error === 'username') {
        form.setFields([
          { name: 'username', errors: [data.message] }
        ]);
      } else if (data.error === 'email') {
        form.setFields([
          { name: 'email', errors: [data.message] }
        ]);
      } else if (data.error === 'admin') {
        form.setFields([
          { name: 'secretKey', errors: [data.message] }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} >
      <Form form={form} onFinish={handleSubmit}>
        <div style={{ width: 300, padding: '2rem', border: '1px solid #d9d9d9', borderRadius: '2px', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <Title level={2}>Sign Up</Title>
          <Form.Item name="full_name" rules={[{ required: true, message: 'Please input your full name!' }]}>
            <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Form.Item name="secretKey" rules={[{ required: true, message: 'Please input your Secret Key!' }]}>
            <Input.Password placeholder="Secret Key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} />
          </Form.Item>
          <Form.Item>
            <div className='w-full flex flex-col gap-6 justify-center items-center text-center' >
              <Button type="primary" className='w-full' htmlType="submit" loading={isLoading}>{!isLoading && 'Sign Up'}</Button>
              <Typography.Text>Or</Typography.Text>
              <Button type='primary' className='w-full' onClick={() => navigate('/admin/signin')}>Sign In</Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AdminSignUp;
