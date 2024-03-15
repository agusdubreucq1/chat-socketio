import { useEffect } from 'react';
import { useSocket } from '../../globalState/socket';
import { useQueryClient } from '@tanstack/react-query';
import { MessageTypeResponse } from '../../vite-env';

const useReceive = () => {
    const socket = useSocket((state) => state.socket);
    const client = useQueryClient();
    const token = client.getQueryData(['token']) as string

    useEffect(() => {
        if (socket && token && client) {
            socket.on('msg', (newMsg: MessageTypeResponse) => {
                console.log("msg de otro", newMsg)
                client.setQueryData(['messages', newMsg.chat_id, token], (old: MessageTypeResponse[]) => {
                    return [...old, newMsg]
                })
            })
        }
    }, [socket, client, token])

};

export default useReceive