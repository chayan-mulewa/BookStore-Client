import { useEffect, useState } from 'react';
import { Header, Footer, Card } from '../components/index';
import { Server } from '../config/index';
import image1 from '../assets/image1.svg';
import axios from 'axios';

function Home() {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Server.booksURL + '?count=6');
                setBooks(response.data);
                setIsLoading(false);
            } catch (error) {
                setBooks([]);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='overflow-x-hidden'>
            <Header />
            <div style={{ backgroundColor: '#f5f6f6' }} className='w-screen h-screen flex flex-col py-32 px-12 justify-center items-center text-center bg-slate-400'>
                <div className='h-full w-full flex flex-col min-h-fit p-4 bg-white text-3xl font-bold md:flex-row' style={{ borderRadius: '3rem' }}>
                    <div className='h-full w-full flex flex-col gap-4 justify-center items-start text-start'>
                        <div>
                            <div>The Store That Feeds Your Mind.</div>
                            <div></div>
                            <div>Visit Us Today</div>
                        </div>
                        <div className='text-2xl'>
                            <div>Where You Can Browse, Buy and </div>
                            <div>Read Books in Minutes</div>
                        </div>
                    </div>
                    <div className='h-full w-full flex flex-col gap-4 justify-center items-start text-start'>
                        <img className='h-full w-full' src={image1} alt="" />
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: '#f5f6f6' }} className='w-screen min-h-fit flex flex-row py-32 px-12 justify-between items-center text-center bg-slate-400'>
                <div className='bg-white min-h-fit w-full flex flex-col p-4 text-xl font-bold md:flex-row' style={{ borderRadius: '3rem' }}>
                    <div className='h-full w-full flex flex-col gap-4 justify-center items-center text-center'>
                        <div className='h-fit w-full flex flex-row gap-4 justify-center items-center text-center'>
                            <div style={{ backgroundColor: '#ee9843', borderRadius: '1rem' }} className='h-1 w-full'></div>
                            <div>NEW_LAUNCHES</div>
                            <div style={{ backgroundColor: '#ee9843', borderRadius: '1rem' }} className='h-1 w-full'></div>
                        </div>
                        {isLoading ? ( // Conditionally rendering loading or cards
                            <div>Loading...</div>
                        ) : (
                            <div className="min-h-fit w-full grid gap-4 justify-center items-center place-content-center place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    books.length > 0 &&
                                    books.map((book, index) => {
                                        return <Card id={book._id} title={book.title} author={book.author} price={book.price} photo={book.photo} key={index} />;
                                    })
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
