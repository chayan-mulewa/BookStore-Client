import React from 'react';

function Drawer({ isOpen, toggleNav, children }) {
    return (
        <div className={`w-screen h-screen fixed top-0 left-0 transition-all duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'bg-transparent pointer-events-none'}`} style={{ zIndex: 1000 }} onClick={toggleNav}>
            <div className={`w-80 h-full pt-14 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white`} onClick={(e) => e.stopPropagation()}>
                <div className='w-full h-full flex flex-col gap-4 p-8 justify-start items-start text-start bg-white'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Drawer;
