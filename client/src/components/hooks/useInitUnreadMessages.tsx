import { useEffect } from 'react';
import { getUnreadMessages } from '../../services/getUnreadMessage';
import useToken from './useToken';
import { useUnreadMessages } from '../../globalState/unreadMessages';

const useInitUnreadMessages = () => {
    const setUnreadMessages = useUnreadMessages(state => state.setUnreadMessages);
    const { token } = useToken()

    useEffect(() => {
        if (!token) return
        const setMessages = async () => {
            const unreadMessages = await getUnreadMessages(token)
            setUnreadMessages(unreadMessages)
        }
        setMessages()
    }, [token, setUnreadMessages]);
};

export default useInitUnreadMessages