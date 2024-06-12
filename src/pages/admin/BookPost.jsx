import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Form, Input, Button, Select, Avatar, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Server } from '../../config/index';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;

const BookPost = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    const [bookname, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('bookname', bookname);
            formData.append('author', author);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('photo', imageUrl);

            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.post(Server.booksURL, {
                title: bookname,
                author: author,
                description: description,
                price: price,
                category: category,
                photo: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setBookName('');
            setAuthor('');
            setDescription('');
            setPrice('');
            setImageUrl('');
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
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
                    <Title level={2}>Post Book</Title>
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
                        <Input placeholder="Book Name" value={bookname} onChange={(e) => setBookName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="author" rules={[{ required: true, message: 'Please input the author!' }]}>
                        <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input.TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="price" rules={[{ required: true, message: 'Please input the description!' }]}>
                        <Input placeholder="Price" type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Select className='w-fit' defaultValue="" style={{ width: '100%' }} onChange={handleCategoryChange}>
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
                        <Button type="primary" className='w-full' htmlType="submit" loading={isLoading}>{!isLoading && 'Sign Up'}</Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default BookPost;
