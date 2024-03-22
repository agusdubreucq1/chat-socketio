import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSocket } from '../../globalState/socket';
import { Socket, io } from 'socket.io-client';

const useInitSocket = () => {
    const { user } = useAuth0()
    const client = useQueryClient()
    const token = client.getQueryData(['token']) as string
    const [socket, setSocket] = useSocket((state) => [state.socket, state.setSocket])


    useEffect(() => {
        console.log('intentando conectarse', {
            socket, token, user
        })

        let newSocket: Socket | null = null
        if (socket === null && token && user?.name) {
            newSocket = io('http://localhost:8080', {
                auth: {
                    token: token,
                },
                forceNew: true,

            })
            newSocket?.on('connect', () => {
                console.log('connected', newSocket?.id)
                setSocket(newSocket as Socket)
            })
            newSocket?.on('disconnect', () => {
                console.log('disconnected', newSocket?.id)
                setSocket(null)
            })
            newSocket?.on('newChat', (idChat: string) => {
                newSocket?.emit('join', idChat)
                client.invalidateQueries({
                    queryKey: ['chats', token],
                })
            })

        }

        // return () => {
        //     console.log('desconectando', newSocket?.id)
        //     newSocket?.disconnect()
        //     setSocket(null)
        // }
    }, [user, token, setSocket])

};

export default useInitSocket