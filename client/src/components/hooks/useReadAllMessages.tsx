import { useEffect } from 'react';
import useToken from './useToken';
import { readMessages } from '../../services/readMessages';
import useMessageByChatId from './useMessageByChatId';
import { useUnreadMessages } from '../../globalState/unreadMessages';

const useReadAllMessages = (idChat: string) => {
    const { token } = useToken()
    const { messages } = useMessageByChatId(idChat as string)
    const readAll = useUnreadMessages(state => state.readAllByChat)

    useEffect(() => {
        if (!token || !idChat || !messages) {
            return
        }
        readMessages(token, idChat)
        readAll(idChat)
    }, [token, idChat, messages, readAll])

};

export default useReadAllMessages