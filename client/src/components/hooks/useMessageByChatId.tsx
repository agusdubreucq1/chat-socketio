import { useQuery } from '@tanstack/react-query';
import { getMessagesByChat } from '../../services/message';
import useToken from './useToken';

const useMessageByChatId = (id: string) => {
  const { token } = useToken()
  const { data: messages, isError, error, isLoading } = useQuery({
    queryKey: ['messages', id, token],
    queryFn: async () => await getMessagesByChat(id, token),
    // refetchOnMount: false,
    enabled: !!id && !!token,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  return {
    messages,
    isError,
    error,
    isLoading
  }
};

export default useMessageByChatId