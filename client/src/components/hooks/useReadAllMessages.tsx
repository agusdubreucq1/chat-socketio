import { useEffect } from 'react';
import useToken from './useToken';
import { readMessages } from '../../services/readMessages';
import { useUnreadMessages } from '../../globalState/unreadMessages';

const useReadAllMessages = (idChat: string) => {
    const { token } = useToken()
    const readAll = useUnreadMessages(state => state.readAllByChat)
    const unreadMessages = useUnreadMessages(state => state.unreadMessages)

    useEffect(() => {
        if (token && idChat && unreadMessages && unreadMessages.length > 0) {
            readMessages(token, idChat)
            readAll(idChat)
        }

    }, [token, idChat, unreadMessages, readAll])

};

export default useReadAllMessages