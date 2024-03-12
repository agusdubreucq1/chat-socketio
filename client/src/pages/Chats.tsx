
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getChats } from '../services/chat';
import { useAuth0 } from '@auth0/auth0-react';
import ModalUsers from '../components/common/ModalUsers';
import { Link, Outlet } from 'react-router-dom';

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

const Button: React.FC<ButtonType> = ({ children, ...props }) => {
    return <button {...props} className='p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors'>{children}</button>
}

const Chat = ({ chat }) => {
    const { user } = useAuth0()
    const members = chat?.members.filter(member => member.user_id !== user?.sub)
    const isChat = members?.length === 1

    return (
        <Link to={`/${chat.id}`} className='relative z-10 flex items-center gap-3 p-4 rounded-md hover:bg-slate-500 transition-colors'>
            <div className='w-9 h-9 rounded-full bg-gray-400 overflow-hidden'>
                {isChat && <img src={members[0].picture} alt={members[0].name}></img>}
            </div>
            <p className='text-md text-white'>
                {isChat ? `${members[0].name}` : `${chat?.name}`}
            </p>
            <p className='absolute top-1 right-2 text-xs text-gray-400'>21/12/2022</p>
        </Link>
    )

}

const Chats: React.FC = () => {
    const { getAccessTokenSilently } = useAuth0()
    const [token, setToken] = React.useState('')

    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessTokenSilently()
            setToken(token)
        }
        getToken()
    }, [getAccessTokenSilently])

    const { data: chats, error, isError } = useQuery({
        queryKey: ['chats', token],
        queryFn: async () => await getChats(token),
        // initialData: [],
        staleTime: 60 * 1000 * 5,
        retry: false,
        enabled: token !== '',
        refetchOnWindowFocus: false
    })

    const { isAuthenticated } = useAuth0()
    const [showModal, setShowModal] = React.useState(false)

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && isAuthenticated && <ModalUsers closeModal={closeModal}></ModalUsers>}

            <section className='flex flex-col w-full h-full min-h-dvh bg-slate-700'>
                <h1 className='p-4 text-white text-2xl'>Chats</h1>
                <div className='flex flex-row w-full h-full border-t border-black border-b'>
                    <div className='w-1/2 max-w-72 flex flex-col justify-center gap-5 p-4 border-r border-black'>
                        <div className='flex justify-center gap-4'>
                            <Button onClick={openModal}>Crear chat</Button>
                            <Button>Crear Grupo</Button>
                        </div>
                        <div>
                            {isError && <p>{error.message}</p>}
                            {chats?.map((chat) => (
                                <Chat key={chat.id} chat={chat}></Chat>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center w-full'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Chats