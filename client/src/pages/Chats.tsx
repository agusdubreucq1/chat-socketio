import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ModalUsers from '../components/common/ModalUsers';
import { Outlet } from 'react-router-dom';
import { PlusIcon } from '../components/common/icons/PlusIcon';
import ListOfChats from '../components/common/ListOfChats';
import useInitUnreadMessages from '../components/hooks/useInitUnreadMessages';


interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const Button: React.FC<ButtonType> = ({ children, ...props }) => {
    return <button {...props} className='p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors'>{children}</button>
}

const Chats: React.FC = () => {
    const { isAuthenticated } = useAuth0()
    const [showModal, setShowModal] = React.useState(false)

    useInitUnreadMessages()

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }


    return (
        <>
            {showModal && isAuthenticated && <ModalUsers closeModal={closeModal}></ModalUsers>}

            <section className='flex flex-col w-full min-h-[calc(100dvh-72px)] h-full  bg-slate-700'>
                <h1 className='p-4 text-white text-2xl'>Chats</h1>
                <div className='flex flex-row w-full h-full overflow-hidden'>
                    <div className='w-1/2 max-w-72 flex flex-col justify-start gap-5 p-4'>
                        <div className='flex justify-center gap-4'>
                            <div className='flex items-center justify-center'>
                                <input className='p-1 rounded-md  bg-slate-600 focus-visible:outline focus-visible:outline-slate-500' placeholder='Buscar' />
                            </div>
                            <Button onClick={openModal}>
                                <PlusIcon className='w-6 h-6'></PlusIcon>
                            </Button>
                        </div>
                        <ListOfChats />
                    </div>
                    <div className='flex justify-center w-full h-full overflow-hidden'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Chats