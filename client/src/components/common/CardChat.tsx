
import { ChatTypeResponse } from '../../vite-env';
import { useAuth0 } from '@auth0/auth0-react';
import useMessageByChatId from '../hooks/useMessageByChatId';
import { orderMessagesByDate } from '../../services/message';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const CardChat = ({ chat }: { chat: ChatTypeResponse }) => {
    const { user } = useAuth0()
    const members = chat?.members?.filter(member => member.user_id !== user?.sub)
    const { messages } = useMessageByChatId(chat.id)
    const lastMessage = orderMessagesByDate(messages ?? [])[(messages ?? []).length - 1]

    return (
        <Link to={`/${chat.id}`} className='relative overflow-hidden w-full z-10 flex items-center gap-3 p-4 rounded-md hover:bg-slate-500 transition-colors'>
            <div className='relative flex min-w-9 w-9 h-9 rounded-full bg-gray-400 overflow-hidden'>
                {<img src={members[0].picture} alt={members[0].name}></img>}
            </div>
            <div className='relative overflow-hidden flex flex-col w-full'>
                <p className='text-md text-start text-white'>
                    {`${members[0].name}`}
                </p>
                <p className='text-xs text-start max-w-full overflow-hidden text-ellipsis items-start text-gray-400'>
                    {lastMessage?.message}
                </p>
            </div>

            <p className='absolute top-1 right-2 text-xs text-gray-400'>
                {/* {lastMessage?.createdAt?.slice(0, 10)} */}
                {dayjs(lastMessage?.createdAt).fromNow()}
            </p>
        </Link>
    )

}

export default CardChat