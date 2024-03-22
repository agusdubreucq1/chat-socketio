
import { ChatTypeResponse } from '../../vite-env';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useUnreadMessages } from '../../globalState/unreadMessages';
dayjs.extend(relativeTime)

const CardChat = ({ chat }: { chat: ChatTypeResponse }) => {
    const { user } = useAuth0()
    const members = chat?.members?.filter(member => member.user_id !== user?.sub)
    const lastMessage = chat.message
    const unreadMessages = useUnreadMessages((state) => state.unreadMessages).filter((unreadMessage) => unreadMessage.chat_id === chat.id && unreadMessage.user_id !== user?.sub)
    const thereIsUnreadMessage = unreadMessages.length > 0

    return (
        <Link to={`/${chat.id}`} className='relative overflow-hidden w-full z-10 flex items-center gap-3 p-4 rounded-md hover:bg-slate-500 transition-colors'>
            <div className='relative flex min-w-9 w-9 h-9 rounded-full bg-gray-400 overflow-hidden'>
                {<img src={members[0].picture} alt={members[0].name}></img>}
            </div>
            <div className='relative overflow-hidden flex flex-col w-full'>
                <p className='text-md text-start text-white'>
                    {`${members[0].name}`}
                </p>
                <div className='flex items-center gap-2 justify-between overflow-hidden'>
                    {
                        thereIsUnreadMessage ? (
                            <>
                            <p className='text-xs text-start max-w-full overflow-hidden text-ellipsis items-start text-gray-400'>
                                {unreadMessages[unreadMessages.length - 1].message}
                            </p>
                            <div className='flex items-center justify-center text-xs bg-green-600 text-white p-2 w-4 h-4 rounded-full'>
                                {unreadMessages.length}
                            </div>
                            </>
                        ) : (
                            <p className='text-xs text-start max-w-full overflow-hidden text-ellipsis items-start text-gray-400'>
                                {lastMessage?.message}
                            </p>
                        )
                    }
                </div>
            </div>

            <p className='absolute top-1 right-2 text-xs text-gray-400'>
                {/* {lastMessage?.createdAt?.slice(0, 10)} */}
                {lastMessage && dayjs(lastMessage?.createdAt).fromNow()}
            </p>
        </Link>
    )

}

export default CardChat