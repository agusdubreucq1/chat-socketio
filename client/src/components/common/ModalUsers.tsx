import React, { useEffect } from "react";

import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from "../../services/users";
import { createChat } from "../../services/chat";
import Modal from "./Modal";
import { ChatTypeResponse } from "../../vite-env";
import { useNavigate } from "react-router-dom";

interface ModalUsersProps {
    closeModal: () => void
}


const ModalUsers: React.FC<ModalUsersProps> = ({ closeModal }) => {
    const client = useQueryClient()
    const navigate = useNavigate()
    const { data: users, error, isError } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000 * 5,
    })

    const { getAccessTokenSilently, user } = useAuth0()
    const [token, setToken] = React.useState('')
    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessTokenSilently()
            setToken(token)
        }
        getToken()
    }, [getAccessTokenSilently])

    const { mutate } = useMutation({
        mutationFn: async (body: { member: string, token: string }) => { return await createChat(body.member, body.token) },
        mutationKey: ['createChat', token],
        onSuccess: (data: ChatTypeResponse) => {
            client.setQueryData(['chats', token], (oldData: ChatTypeResponse[]) => {
                if (oldData.some(chat => chat.id === data.id)) return oldData
                return [...oldData, data]
            })
            navigate(`/${data.id}`)
            closeModal()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, member: string) => {
        e.stopPropagation()
        const token = await getAccessTokenSilently()
        mutate({ member, token })
    }

    return (
        <Modal onClick={closeModal}>
            <div className='flex flex-col p-6 gap-4 z-50 bg-gray-400 rounded-md'>
                <h1 className='text-2xl'>Crear chat</h1>
                {isError && <p>{error.message}</p>}
                <div className='flex flex-col'>
                    {
                        users?.map(userOfAll => {
                            if (userOfAll.user_id === user?.sub) return; null;
                            return (
                                <div key={userOfAll.user_id} onClick={(e) => handleClick(e, userOfAll.user_id)} className='flex items-center flex-row gap-3 p-2 rounded-md hover:bg-slate-500 transition-colors'>
                                    <div className='w-9 h-9 overflow-hidden rounded-full bg-gray-400'>
                                        <img className='flex w-full h-full' src={userOfAll.picture} alt={userOfAll.name} />
                                    </div>
                                    <p>{userOfAll.name}</p>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </Modal>

    )
}

export default ModalUsers