import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from '../../globalState/socket';
import { Socket, io } from 'socket.io-client';
import { ChatTypeResponse } from '../../vite-env';

const useInitSocket = () => {
    const { user } = useAuth0()
    const client = useQueryClient()
    const token = client.getQueryData(['token']) as string
    const [socket, setSocket] = useSocket((state) => [state.socket, state.setSocket])
    const chats = client.getQueryData(['chats', token]) as ChatTypeResponse[]

    useEffect(() => {
        console.log('intentando conectarse', {
            socket, token, user, chats
        })
        if (socket === null && token && user?.name && chats !== undefined) {
            let newSocket: Socket | null = null
            newSocket = io('http://localhost:8080', {
                auth: {
                    token: token,
                },
                forceNew: true,

            })
            newSocket?.on('connect', () => {
                console.log('connected', newSocket?.id)
                // console.log('emitiendo room a chats:', chats)
                // for (const chat of chats) {
                //     console.log('room', chat.id, newSocket?.id)
                //     newSocket?.emit('room', chat.id)
                // }
                setSocket(newSocket as Socket)
            })
            // console.log('conectado', newSocket.id)

        }

        return () => {
            console.log('desconectando', socket?.id)
            socket?.disconnect()
        }
    }, [user, token, setSocket, chats])

};

export default useInitSocket