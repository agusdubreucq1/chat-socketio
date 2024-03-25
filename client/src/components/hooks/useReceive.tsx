import { useEffect } from 'react';
import { useSocket } from '../../globalState/socket';
import { useQueryClient } from '@tanstack/react-query';
import { ChatTypeResponse, MessageTypeResponse } from '../../vite-env';
import { useUnreadMessages } from '../../globalState/unreadMessages';
import { useAuth0 } from '@auth0/auth0-react';

const useReceive = () => {
    const { user } = useAuth0();
    const socket = useSocket((state) => state.socket);
    const client = useQueryClient();
    const token = client.getQueryData(['token']) as string
    const addUnreadMessage = useUnreadMessages(state => state.addUnreadMessage)

    useEffect(() => {
        if (socket && token && client && user?.sub) {
            // InitUnreadMessages()
            socket.on('msg', async (newMsg: MessageTypeResponse) => {
                console.log("msg de otro", newMsg)
                let isDefinedMessage = true
                await client.setQueryData(['messages', newMsg.chat_id, token], (old: MessageTypeResponse[]) => {
                    if (!old || !old.length) {
                        console.log('primera vez que se setean los mensajes')
                        isDefinedMessage = false
                        return [newMsg]
                    }
                    return [...old, newMsg]
                })
                if (!isDefinedMessage) {
                    client.invalidateQueries({ queryKey: ['messages', newMsg.chat_id, token] })
                }

                client.setQueryData(['chats', token], (old: ChatTypeResponse[]) => {
                    return old.map(chat => {
                        if (chat.id === newMsg.chat_id) {
                            return {
                                ...chat,
                                message: newMsg,
                                last_message_id: newMsg.id
                            }
                        }
                        return chat
                    })
                })
                if (newMsg.user_id !== user?.sub) {
                    addUnreadMessage(newMsg)
                }
            })
        }//TODO: receive all msg in a community global state 
    }, [socket, client, token, addUnreadMessage, user])

};

export default useReceive