import { useQuery } from '@tanstack/react-query';
import useToken from './useToken';
import { getChats } from '../../services/chat';

const useChats = () => {
    const {token} = useToken()
    const { data: chats, isError, error, isLoading } = useQuery({
        queryKey: ['chats', token],
        queryFn: async () => await getChats(token),
        staleTime: Infinity,
        retry: false,
        enabled: !!token && token !== '',
        refetchOnWindowFocus: false
    })
  return {
    chats,
    isError,
    error,
    isLoading
  }
};

export default useChats