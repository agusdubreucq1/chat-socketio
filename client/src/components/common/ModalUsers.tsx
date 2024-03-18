import React from "react";

import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChat } from "../../services/chat";
import Modal from "./Modal";
import { ChatTypeResponse } from "../../vite-env";
import { useNavigate } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import useToken from "../hooks/useToken";
import ErrorMessage from "./ErrorMessage";
import SkeletonUsers from "./SkeletonUsers";
import { useSocket } from "../../globalState/socket";

interface ModalUsersProps {
    closeModal: () => void
}


const ModalUsers: React.FC<ModalUsersProps> = ({ closeModal }) => {
    const client = useQueryClient()
    const navigate = useNavigate()
    const socket = useSocket(state => state.socket)
    const { users, isError, error, isLoading } = useUsers()
    const { token } = useToken()
    const { user } = useAuth0()

    const { mutate } = useMutation({
        mutationFn: async (body: { member: string, token: string }) => { return await createChat(body.member, body.token) },
        mutationKey: ['createChat', token],
        onSuccess: async (data: ChatTypeResponse) => {
            console.log('new chat', data.id)
            socket?.emit('room', data.id)
            await client.setQueryData(['chats', token], (oldData: ChatTypeResponse[]) => {
                if (oldData.some(chat => chat.id === data.id)) return oldData
                return [...oldData, data]
            })
            //TODO: aegregarse al nuevo room para recibir los mensajes
            navigate(`/${data.id}`)
            closeModal()
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, member: string) => {
        e.stopPropagation()
        mutate({ member, token })
    }

    return (
        <Modal onClick={closeModal}>
            <div className='flex flex-col p-6 gap-4 z-50 bg-gray-400 rounded-md'>
                <h1 className='text-2xl'>Crear chat</h1>
                {isError &&
                    <ErrorMessage msg={error?.message} />
                }
                <div className='flex flex-col'>
                    {isLoading
                        ? <SkeletonUsers />
                        : users?.map(userOfAll => {
                            if (userOfAll.user_id === user?.sub) return null;
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