import { useQuery } from '@tanstack/react-query';
import useToken from './useToken';
import { getChats } from '../../services/chat';
// import { useEffect } from 'react';
// import { useSocket } from '../../globalState/socket';

const useChats = () => {
    const {token} = useToken()
    // const socket = useSocket((state) => state.socket)
    const { data: chats, isError, error, isLoading } = useQuery({
        queryKey: ['chats', token],
        queryFn: async () => await getChats(token),
        staleTime: Infinity,
        retry: false,
        enabled: !!token && token !== '',
        refetchOnWindowFocus: false
    })

    // useEffect(() => {
    //     if (!token || !socket || !refetch) return
    //     socket?.on('newChat', refetch)
    // }, [token, refetch, socket])

  return {
    chats,
    isError,
    error,
    isLoading
  }
};

export default useChats