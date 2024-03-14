
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import { ChatTypeResponse } from '../vite-env';
import { useAuth0 } from '@auth0/auth0-react';
import { SendIcon } from '../components/common/icons/SendIcon';
import { getChats } from '../services/chat';
import { getMessagesByChat, orderMessagesByDate } from '../services/message';
import { useSocket } from '../globalState/socket';
import { MessageTypeResponse } from '../vite-env';
import { useOnlineUsers } from '../globalState/onlineUsers';

const Messages: React.FC = () => {
    const formRef = useRef<null | HTMLFormElement>(null)
    const { id } = useParams()
    const { user } = useAuth0()
    const client = useQueryClient()
    const token = client.getQueryData(['token']) as string
    const { data: chats } = useQuery({
        queryKey: ['chats', token],
        queryFn: async () => await getChats(token),
        staleTime: 60 * 1000 * 5,
        retry: false,
        enabled: !!token && token !== '',
        refetchOnWindowFocus: false
    })
    const chat = chats?.find(chat => chat.id === id)
    const members = chat?.members.filter(member => member.user_id !== user?.sub)
    const isChat = members?.length === 1
    const onlineUsers = useOnlineUsers(state => state.onlineUsers)
    const isOnline = isChat && onlineUsers.some(user => user.sub === members[0].user_id)

    // const [socket, setSocket] = React.useState<null | Socket>(null)
    const socket = useSocket((state) => state.socket)
    const { data: messages } = useQuery({
        queryKey: ['messages', id, token],
        queryFn: async () => await getMessagesByChat(id as string, token),
        enabled: !!id && !!token,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000 * 5
    })

    useEffect(() => {
        if (socket && id && token && client) {
            socket.on('msg', (newMsg) => {
                console.log("msg de otro", newMsg)
                client.setQueryData(['messages', id, token], (old: MessageTypeResponse[]) => {
                    return [...old, newMsg]
                })
            })
        }
    }, [socket, client, id, token])

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const msg = formData.get('msg')
        if (socket === null || socket?.connected === false) return
        socket?.emit('msg', `${id}`, msg)
        formRef.current?.reset()
        // const newMsg = {
        //     user_id: user?.sub,
        //     chat_id: id,
        //     message: msg as string,
        //     createdAt: new Date().toISOString(),
        //     id: crypto.randomUUID()
        // }

        // client.setQueryData(['messages', id, token], (old: MessageTypeResponse[]) => {
        //     return [...old, newMsg]
        // })
    }

    return (
        <div className='relative flex float-left flex-col w-full h-full pb-14'>
            <header className='sticky top-0 flex w-full items-center justify-center gap-3 px-6 pt-2 pb-4 border-b border-black bg-black z-30'>
                <div className='w-10 h-10 rounded-full overflow-hidden border'>
                    {isChat && <img src={members[0].picture} alt={members[0].name}></img>}
                </div>
                <h1 className='text-white text-xl'>
                    {isChat ? `${members[0].name}` : `${chat?.name}`}
                </h1>
                {isOnline &&
                    <div className='absolute bottom-1 flex items-center gap-1'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                        <p className='text-xs text-white'>En linea</p>
                    </div>}
            </header>
            <div className='relative flex flex-col w-full h-full overflow-auto gap-1 p-4'>
                {
                    orderMessagesByDate(messages ?? []).map(message => {
                        const isMyMessage = message.user_id === user?.sub
                        return (
                            <div key={message.id} className={`relative ${isMyMessage ? 'justify-end' : 'justify-start'} flex gap-3`}>
                                <div
                                    className={`relative flex min-w-10 text-white gap-1 p-1 pb-4 pr-2 rounded-md w-fit ${isMyMessage ? 'bg-green-700' : 'bg-slate-400'}`}>
                                    <p className='text-lg'>{message.message}</p>
                                    <p className='absolute bottom-0 right-1 text-xs text-gray-300'>{message.createdAt.slice(11, 16)}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <form ref={formRef} onSubmit={sendMessage} className='absolute bg-white left-0 bottom-0 items-center flex gap-6 w-full border-t border-black px-4 py-2 z-30'>
                <input type="text" name="msg" placeholder='Type a message' className='w-full px-3 py-1 rounded-md bg-slate-400 focus-within:outline-none placeholder:text-gray-600'></input>
                <button className='flex items-center justify-center p-2 w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:bg-green-300'><SendIcon color='white'></SendIcon></button>
            </form>
        </div>
    );
};

export default Messages