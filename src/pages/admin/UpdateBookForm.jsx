import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, Select, Avatar, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Server } from '../../config/index';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

const UpdateBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Server.booksURL + `/${id}`);
                const { title, author, price, description, category, photo } = response.data;
                form.setFieldsValue({
                    bookname: title,
                    author,
                    price,
                    description,
                    category,
                    imageUrl: photo,
                });
                setImageUrl(photo);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };
        fetchData();
    }, [id, form]);

    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
            await axios.put(Server.booksURL, {
                id: id,
                title: values.bookname,
                author: values.author,
                description: values.description,
                price: values.price,
                category: values.category,
                photo: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            navigate('/admin/update-book');
        } catch (error) {
            console.error('Error updating book:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = ({ file }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Form form={form} onFinish={handleSubmit}>
                <div style={{ width: 300, padding: '2rem', border: '1px solid #d9d9d9', borderRadius: '2px', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Title level={2}>Update Book</Title>
                    <Form.Item>
                        <Avatar size={150} icon={<UserOutlined />} src={imageUrl} />
                    </Form.Item>
                    <Form.Item>
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageUpload}
                        >
                            <Button icon={<UploadOutlined />}>Upload Photo</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="bookname" rules={[{ required: true, message: 'Please input the book name!' }]}>
                        <Input placeholder="Book Name" />
                    </Form.Item>
                    <Form.Item name="author" rules={[{ required: true, message: 'Please input the author!' }]}>
                        <Input placeholder="Author" />
                    </Form.Item>
                    <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input.TextArea placeholder="Description" />
                    </Form.Item>
                    <Form.Item name="price" rules={[{ required: true, message: 'Please input the price!' }]}>
                        <Input placeholder="Price" type='number' />
                    </Form.Item>
                    <Form.Item name="category">
                        <Select className='w-fit' style={{ width: '100%' }} placeholder="Select Category">
                            <Option value="">Select Category</Option>
                            <Option value="scienceFiction">Science Fiction</Option>
                            <Option value="fantasy">Fantasy</Option>
                            <Option value="mystery">Mystery</Option>
                            <Option value="autobiography">Autobiography</Option>
                            <Option value="philosophy">Philosophy</Option>
                            <Option value="religion">Religion</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" className='w-full' htmlType="submit" loading={isLoading}>{!isLoading && 'Update'}</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default UpdateBookForm;
