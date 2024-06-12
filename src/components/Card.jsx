import { useEffect, useState } from 'react';
import { Server } from '../config/index';
import { IsValidToken } from '../utils/index'
import image1 from '../assets/cover.jpg'
import { useDataContext } from '../contexts/index';
import axios from 'axios';

function Card({
    cartId,
    id,
    photo,
    title,
    author,
    price,
    isRemove
}) {

    const { myDetails, setMyDetails } = useDataContext();

    const handleAddToCart = async () => {

        const isValidateToken = await IsValidToken();

        if (isValidateToken) {
            const token = await document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.post(Server.usersURL + '/cart', {
                userId: myDetails._id,
                bookId: id,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            alert('Book Added Into Cart')
        } else {
            alert('Please Login To Add Book Into Cart')
        }
    }

    const handleRemoveToCart = async () => {

        const isValidateToken = await IsValidToken();

        if (isValidateToken) {
            const token = await document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.delete('http://localhost:5000/bookstore/api/users/cart', {
                data: { cartId },
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            alert('Book Removed Into Cart');
            const updatedBooks = await myDetails.books.filter(book => book.cartId !== cartId);
            await setMyDetails({ ...myDetails, books: updatedBooks });
        } else {
            // alert('Please Login To Add Book Into Cart')
        }
    }

    return (
        <div className='h-60 w-80 flex gap-4 p-0 flex-row'>
            <div><img src={photo} className='h-full w-42' alt="" /></div>
            <div className='flex flex-col justify-between'>
                <div className='text-start'><h1>{title}</h1></div>
                <div className='text-start text'><p>{author}</p></div>
                <div className='flex flex-col gap-1'>
                    <div className='text-start'>₹{price}/-</div>
                    {
                        isRemove ?
                            <>
                                <button onClick={handleRemoveToCart} style={{ backgroundColor: '#ee9843' }} className='w-fit text-start p-2 rounded-lg'>Remove</button>
                            </> :
                            <>
                                <button onClick={handleAddToCart} style={{ backgroundColor: '#ee9843' }} className='w-fit text-start p-2 rounded-lg'>Add To Cart</button>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;
