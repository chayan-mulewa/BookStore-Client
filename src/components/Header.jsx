import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IsValidToken } from '../utils/index';
import { useDataContext } from '../contexts/index';
import Button from './Button';
import Drawer from './Drawer';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { myDetails } = useDataContext();

    console.log(myDetails)

    const toggleNav = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 650);
        };

        window.addEventListener('resize', handleResize);

        const fetchData = async () => {
            try {
                const isValidToken = await IsValidToken();
                setIsLoggedIn(isValidToken);
            } catch (error) {
                console.error("Error checking token validity:", error);
            }
        };

        fetchData();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className='h-20 w-screen px-10 fixed' style={{ backgroundColor: '#f5f6f6' }} >
                <nav className='h-full w-full flex flex-row justify-between items-center text-center font-bold text-xl'>
                    <ul className='flex flex-row gap-4'>
                        {isMobile && (
                            <div className='flex flex-row gap-4 justify-center items-center text-center relative text-xl'>
                                <Button toggleNav={toggleNav} isOpen={isOpen} />
                                <Drawer isOpen={isOpen} toggleNav={toggleNav} >
                                    <Link to="/home" onClick={toggleNav}>HOME</Link>
                                    <Link to="/search" onClick={toggleNav}>SEARCH</Link>
                                    {isLoggedIn ? (
                                        <>
                                            <Link to="/cart" onClick={toggleNav}>CART</Link>
                                            {myDetails.role === 'admin' && (
                                                <Link to="/admin/post-book" onClick={toggleNav}>POST BOOK</Link>
                                            )}
                                            <Link to="/logout" onClick={toggleNav}>LOGOUT</Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/signin" onClick={toggleNav}>LOGIN</Link>
                                            <Link to="/signup" onClick={toggleNav}>SIGNUP</Link>
                                        </>
                                    )}
                                </Drawer>
                            </div>
                        )}
                        <Link to="/">BOOKSTORE</Link>
                    </ul>
                    <ul className={`flex flex-row gap-4 ${isMobile ? 'hidden' : ''}`}>
                        <Link to="/home">HOME</Link>
                        <Link to="/search">SEARCH</Link>
                    </ul>
                    <ul className={`flex flex-row gap-4 ${isMobile ? 'hidden' : ''}`}>
                        {isLoggedIn ? (
                            <>
                                <Link to="/cart">CART</Link>
                                {
                                    myDetails.role === 'admin' && (
                                        <Link to="/admin/post-book">POST_BOOK</Link>
                                    )}
                                <Link to="/logout">LOGOUT</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signin">LOGIN</Link>
                                <Link to="/signup">SIGNUP</Link>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
