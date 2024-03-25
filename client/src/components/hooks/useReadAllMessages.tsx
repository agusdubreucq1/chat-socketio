import { useEffect } from 'react';
import useToken from './useToken';
import { readMessages } from '../../services/readMessages';
// import useMessageByChatId from './useMessageByChatId';
import { useUnreadMessages } from '../../globalState/unreadMessages';

const useReadAllMessages = (idChat: string) => {
    const { token } = useToken()
    // const { messages } = useMessageByChatId(idChat as string)
    const readAll = useUnreadMessages(state => state.readAllByChat)
    const unreadMessages = useUnreadMessages(state => state.unreadMessages)
    console.log('ejecutando hook useReadAllMessages')

    useEffect(() => {
        if (token && idChat && unreadMessages && unreadMessages.length > 0) {
            const datos = {
                chatId: idChat,
                messages: unreadMessages.map(unreadMessage => unreadMessage.message),
                token: token
            }
            console.log('datos', datos)
            readMessages(token, idChat)
            readAll(idChat)
        }

    }, [token, idChat, unreadMessages, readAll])

};

export default useReadAllMessages