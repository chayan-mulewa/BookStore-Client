import { useState, useEffect } from 'react';
import { Card } from '../../components/index';
import { Server } from '../../config/index';
import axios from 'axios';

function UpdateBook() {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Server.booksURL);
                setBooks(response.data);
                console.log(response.data)
                setIsLoading(false);
            } catch (error) {
                setBooks([]);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <div style={{ backgroundColor: '#f5f6f6' }} className='min-h-fit h-screen w-screen flex flex-col p-10 gap-4 justify-start items-center text-center overflow-auto'>
            <div className='h-fit w-full text-3xl font-bold'><h1>Update Books</h1></div>
            {isLoading ? (
                <div className='text-xl font-bold'>Loading...</div>
            ) : (
                <div className="min-h-fit w-full grid gap-4 p-4 justify-center items-center place-content-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        books.length > 0 &&
                        books.map((book, index) => (
                            <Card id={book._id} title={book.title} author={book.author} price={book.price} photo={book.photo} key={index} isDelete={false} isUpdate={true} />
                        ))}
                </div>
            )}
        </div>
    );
}

export default UpdateBook;
