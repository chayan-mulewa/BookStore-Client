import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spin } from 'antd';
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
    isRemove,
    isDelete,
    isUpdate
}) {

    const navigate = useNavigate();

    const { myDetails, setMyDetails } = useDataContext();
    const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
    const [isLoadingRemoveFromCart, setIsLoadingRemoveFromCart] = useState(false);
    const [isLoadingDeleteBook, setIsLoadingDeleteBook] = useState(false);

    const handleAddToCart = async () => {
        setIsLoadingAddToCart(true);

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

        setIsLoadingAddToCart(false);
    }

    const handleRemoveToCart = async () => {
        setIsLoadingRemoveFromCart(true);

        const isValidateToken = await IsValidToken();

        if (isValidateToken) {
            const token = await document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.delete(Server.usersURL + '/cart', {
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

        setIsLoadingRemoveFromCart(false);
    }

    const handleDeleteBook = async () => {
        setIsLoadingDeleteBook(true);

        const isValidateToken = await IsValidToken();

        if (isValidateToken) {
            const token = await document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

            const response = await axios.delete(Server.booksURL, {
                data: { id },
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            alert('Book Deleted')
        } else {

        }
        setIsLoadingDeleteBook(false);
    }

    const handleUpdateBook = async () => {
        navigate(`/admin/update-book/${id}`);
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
                                <Button
                                    onClick={handleRemoveToCart}
                                    style={{ backgroundColor: '#ee9843' }}
                                    className='w-fit text-start p-2 rounded-lg'
                                    loading={isLoadingRemoveFromCart} // Loading state for Remove from Cart button
                                >
                                    {isLoadingRemoveFromCart ? 'Removing...' : 'Remove'}
                                </Button>
                            </> :
                            <>
                                <Button
                                    onClick={handleAddToCart}
                                    style={{ backgroundColor: '#ee9843' }}
                                    className='w-fit text-start p-2 rounded-lg'
                                    loading={isLoadingAddToCart} // Loading state for Add to Cart button
                                >
                                    {isLoadingAddToCart ? 'Adding...' : 'Add To Cart'}
                                </Button>
                            </>
                    }
                    {
                        isDelete &&
                        <>
                            <Button
                                onClick={handleDeleteBook}
                                style={{ backgroundColor: '#ee9843' }}
                                className='w-fit text-start p-2 rounded-lg'
                                loading={isLoadingDeleteBook}
                            >
                                {isLoadingDeleteBook ? 'Deleting...' : 'Delete Book'}
                            </Button>
                        </>
                    }

                    {
                        isUpdate &&
                        <>
                            <Button
                                onClick={handleUpdateBook}
                                style={{ backgroundColor: '#ee9843' }}
                                className='w-fit text-start p-2 rounded-lg'
                            >
                                Update Book
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Card;
