import React from 'react';

function Button({ toggleNav, isOpen }) {
    return (
        <button
            style={{
                width: '1.275rem',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                zIndex: 2000
            }}
            onClick={toggleNav}
        >
            <span
                style={{
                    height: '0.15rem',
                    width: '100%',
                    background: 'black',
                    borderRadius: '9px',
                    opacity: '1',
                    transition: '0.3s ease-in-out',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    transformOrigin: 'left'
                }}
            />
            <span
                style={{
                    height: '0.15rem',
                    width: isOpen ? '0%' : '100%',
                    background: 'black',
                    borderRadius: '9px',
                    opacity: isOpen ? '0' : '1',
                    transition: '0.3s ease-in-out'
                }}
            />
            <span
                style={{
                    height: '0.15rem',
                    width: '100%',
                    background: 'black',
                    borderRadius: '9px',
                    opacity: '1',
                    transition: '0.3s ease-in-out',
                    transform: isOpen ? 'rotate(-45deg)' : 'rotate(0deg)',
                    transformOrigin: 'left'
                }}
            />
        </button>
    );
}

export default Button;
