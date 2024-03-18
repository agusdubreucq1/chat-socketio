import React from 'react';
import useChats from '../hooks/useChats';
import ErrorMessage from './ErrorMessage';
import { sortChats } from '../../services/sortChats';
import CardChat from './CardChat';
import SkeletonChats from './SkeletonChats';

const ListOfChats: React.FC = () => {
    const { chats, isError: isChatError, isLoading: isChatLoading } = useChats()

    return (
        <div>
            {isChatError
                ? <ErrorMessage msg='No se encontraron chats'></ErrorMessage>
                : sortChats(chats ?? [])?.map((chat) => (
                    <CardChat key={chat.id} chat={chat}></CardChat>
                ))
            }{
                isChatLoading &&
                <SkeletonChats />
            }
        </div>
    );
};

export default ListOfChats