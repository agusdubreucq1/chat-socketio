import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../common/LogoutButton';
import { UserIcon } from '../common/icons/UserIcon';

const Header: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()

    return (
        <header className='sticky top-0 z-40 flex bg-slate-900 items-center p-4 justify-center'>
            <nav className='flex gap-4 max-w-[1200px] px-4 justify-between items-center w-full'>
                {
                    isAuthenticated
                        ?
                        <>
                            <div role='rutas' className='flex'>
                                <Link className='text-xl text-white hover:text-gray-400' to={'/'}>
                                    Chats
                                    </Link>
                            </div>
                            <div role='auth' className='flex gap-4'>
                                <Link className='flex items-center gap-1 text-nowrap text-xl w-max text-white hover:text-gray-400' to={'/profile'}>
                                    <UserIcon className='w-10 h-10' />
                                    {user?.name}
                                </Link>
                                <LogoutButton></LogoutButton>
                            </div>

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