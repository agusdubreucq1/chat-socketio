import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../common/LogoutButton';
import { UserIcon } from '../common/icons/UserIcon';
import ModalLogout from '../common/ModalLogout';

const Header: React.FC = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0()
    const [showModal, setShowModal] = React.useState(false)

    return (
        <header className='sticky top-0 z-40 flex bg-slate-900 items-center p-4 justify-center'>
            <nav className='flex gap-4 max-w-[1200px] px-4 justify-between items-center w-full'>
                {
                    isAuthenticated
                        ?
                        <>
                            <div role='rutas' className='flex'>
                                <Link className='text-xl text-white' to={'/'}>
                                    <p className='text-xl px-2 py-1 bg-blue-500 rounded-md hover:bg-blue-700 transition-colors'>Chats</p>
                                </Link>
                            </div>
                            <div role='auth' className='flex gap-4'>
                                <Link className='flex items-center gap-1 text-nowrap text-xl w-max text-white hover:text-gray-400' to={'/profile'}>
                                    <UserIcon className='w-10 h-10' />
                                    {user?.name}
                                </Link>
                                <LogoutButton onClick={() => setShowModal(true)}></LogoutButton>
                            </div>

                        </>
                        :
                        <>
                            <button className='mx-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded' onClick={() => loginWithRedirect()}>Login</button>
                        </>
                }
                {showModal && isAuthenticated && <ModalLogout closeModal={() => setShowModal(false)}></ModalLogout>}
            </nav>
        </header>
    );
};

export default Header