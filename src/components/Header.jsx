import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IsValidToken } from '../utils/index';
import { useDataContext } from '../contexts/index';
import Button from './Button';
import Drawer from './Drawer';

function Header() {

    const { myDetails } = useDataContext();

    if (document.cookie) {
        if (!myDetails.role) {
            return <div className='h-20 w-screen px-10 fixed flex justify-center items-center text-center text-2xl font-bold' style={{ backgroundColor: '#f5f6f6' }}  ><h1>Loading...</h1></div>;
        }
    }

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleNav = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
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

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

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
                                            {myDetails.role === 'admin' && (
                                                <>
                                                    <Link to="/admin/post-book" onClick={toggleNav}>POST</Link>
                                                    <Link to="/admin/delete-book" onClick={toggleNav}>DELETE</Link>
                                                    <Link to="/admin/update-book" onClick={toggleNav}>UPDATE</Link>
                                                </>
                                            )}
                                            <Link to="/cart" onClick={toggleNav}>CART</Link>
                                            <button onClick={handleLogout}>LOGOUT</button>
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
                                {
                                    myDetails.role === 'admin' && (
                                        <>
                                            <Link to="/admin/post-book" onClick={toggleNav}>POST</Link>
                                            <Link to="/admin/delete-book" onClick={toggleNav}>DELETE</Link>
                                            <Link to="/admin/update-book" onClick={toggleNav}>UPDATE</Link>
                                        </>
                                    )}
                                <Link to="/cart">CART</Link>
                                <button onClick={handleLogout}>LOGOUT</button>
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
