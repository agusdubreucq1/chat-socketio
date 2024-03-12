import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        <header className='sticky top-0 z-40 flex bg-slate-900 items-center p-4 justify-center'>
            <nav className='flex gap-4 max-w-[1200px] justify-start w-full'>
                {
                    isAuthenticated
                        ?
                        <>
                            <Link className='text-xl text-white' to={'/profile'}>Profile</Link>
                            <Link className='text-xl text-white' to={'/'}>Chats</Link>
                        </>
                        :
                        <>
                            <a className='text-xl text-white' onClick={() => loginWithRedirect()}>Login</a>
                        </>
                }

            </nav>
        </header>
    );
};

export default Header