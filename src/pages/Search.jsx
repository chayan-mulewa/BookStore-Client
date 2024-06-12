import { useState } from 'react';
import { Select, Input } from 'antd';
import { Card } from '../components/index';
import axios from 'axios';
import { Server } from '../config/index';

const { Option } = Select;

function Search() {

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleTypeChange = (value) => {
        setType(value);
    };

    const handleSearchByEnterKey = async (event) => {
        if (event.key === 'Enter') {
            if (search == '') return
            if (type == '') {
                alert("Please Selete Type")
                return;
            }
            try {
                const response = await axios.get(Server.booksURL + `?type=${type}&&data=${search}&&category=${category}`);
                setBooks(response.data);
            } catch (error) {

            }
        }
    };

    return (
        <div style={{ backgroundColor: '#f5f6f6' }} className='min-h-fit h-screen w-screen flex flex-col p-10 gap-4 justify-between items-center text-center overflow-auto'>
            <div className='h-fit w-full text-3xl font-bold'><h1>Search For Books</h1></div>
            <div className='h-full w-full flex flex-col'>
                <div className='h-fit w-full flex flex-col gap-4 py-4 sm:flex-row'>
                    <div className='h-full w-full'><Input className='w-full' type="text" value={search} onChange={(e) => handleSearch(e.target.value)} onKeyDown={handleSearchByEnterKey} /></div>
                    <div className='h-full w-full sm:w-fit'>
                        <Select className='w-fit' defaultValue="" style={{ width: '100%' }} onChange={handleTypeChange}>
                            <Option value="">Select Type</Option>
                            <Option value="author">Author</Option>
                            <Option value="title">Title</Option>
                        </Select>
                    </div>
                    <div className='h-full w-full sm:w-fit'>
                        <Select className='w-fit' defaultValue="" style={{ width: '100%' }} onChange={handleCategoryChange}>
                            <Option value="">Select Category</Option>
                            <Option value="scienceFiction">Science Fiction</Option>
                            <Option value="fantasy">Fantasy</Option>
                            <Option value="mystery">Mystery</Option>
                            <Option value="autobiography">Autobiography</Option>
                            <Option value="philosophy">Philosophy</Option>
                            <Option value="religion">Religion</Option>
                        </Select>
                    </div>
                </div>
                <div className="min-h-fit grid gap-4 p-4 justify-center items-center place-content-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        books.length > 0 &&
                        books.map((book, index) => {
                            return <Card id={book._id} title={book.title} author={book.author} price={book.price} photo={book.photo} key={index} />;
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Search;
