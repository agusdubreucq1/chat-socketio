import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { SendIcon } from '../components/common/icons/SendIcon';
import { orderMessagesByDate } from '../services/message';
import { useSocket } from '../globalState/socket';
import { useOnlineUsers } from '../globalState/onlineUsers';
import useChats from '../components/hooks/useChats';
import useMessageByChatId from '../components/hooks/useMessageByChatId';

const Messages: React.FC = () => {
    const formRef = useRef<null | HTMLFormElement>(null)
    const socket = useSocket((state) => state.socket)
    const { id } = useParams()
    const { user } = useAuth0()
    const { chats } = useChats()
    const { messages } = useMessageByChatId(id as string)

    const chat = chats?.find(chat => chat.id === id)
    const member = chat?.members.filter(member => member.user_id !== user?.sub)[0]
    const onlineUsers = useOnlineUsers(state => state.onlineUsers)
    const isOnline = onlineUsers.some(user => user.sub === (member?.user_id))

    const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const msg = formData.get('msg')
        if (socket === null || socket?.connected === false) {
            console.log('no socket')
            return
        }
        socket?.emit('msg', `${id}`, msg)
        formRef.current?.reset()
    }

    if (!member || !id) {
        return (
            <></>
        )
    }

    return (
        <div className='relative flex float-left flex-col w-full h-full pb-14'>
            <header className='sticky top-0 flex w-full items-center justify-center gap-3 px-6 pt-2 pb-4 border-b border-black bg-black z-30'>
                <div className='w-10 h-10 rounded-full overflow-hidden border'>
                    {<img src={member.picture} alt={member.name}></img>}
                </div>
                <h1 className='text-white text-xl'>
                    {`${member.name}`}
                </h1>
                {isOnline &&
                    <div className='absolute bottom-1 flex items-center gap-1'>
                        <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                        <p className='text-xs text-white'>En linea</p>
                    </div>
                }
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