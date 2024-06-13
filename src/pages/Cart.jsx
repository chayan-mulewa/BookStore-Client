import React, { useState, useEffect } from 'react';
import { Card } from '../components/index';
import { useDataContext } from '../contexts/index';

function Cart() {
    const { myDetails } = useDataContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(!myDetails || !myDetails.books);
    }, [myDetails]);

    return (
        <div style={{ backgroundColor: '#f5f6f6' }} className='min-h-fit h-screen w-screen flex flex-col p-10 gap-4 justify-start items-center text-center overflow-auto'>
            <div className='h-fit w-full text-3xl font-bold'><h1>Check Out Cart</h1></div>
            {isLoading ? (
                <div className='text-xl font-bold'>Loading...</div>
            ) : (
                <div className="min-h-fit w-full grid gap-4 p-4 justify-center items-center place-content-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {myDetails.books.map((book, index) => (
                        <Card cartId={book.cartId} id={book.book._id} title={book.book.title} author={book.book.author} price={book.book.price} photo={book.book.photo} key={index} isRemove={true} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cart;
