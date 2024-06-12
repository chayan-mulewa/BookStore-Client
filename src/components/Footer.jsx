import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{ backgroundColor: '#f5f6f6' }} className='h-52 w-screen flex flex-col gap-4 px-12 justify-between items-center text-center'>
      <div className='h-1 w-full bg-gray-300'></div>
      <div className='h-full w-full flex flex-col gap-4 px-12 justify-between items-center text-center md:flex-row'>
        <div className='text-2xl font-bold'><h1>BOOKSTORE</h1></div>
        <div className='h-full w-full flex flex-col gap-4 justify-center items-center text-center text-2xl font-bold md:flex-row'>
          <div className='flex flex-col gap-4 text-start text-2xl font-bold'>
            <div><h1>Quick Links</h1></div>
            <ul className='text-sm flex flex-col gap-4'>
              <Link to="/home">HOME</Link>
              <Link to="/shop">SHOP</Link>
              <Link to="/search">SEARCH</Link>
            </ul>
          </div>
          {/* <div className='text-2xl font-bold'><h1>BOOKSTORE</h1></div> */}
        </div>
      </div>

    </div>
  );
}

export default Footer;
