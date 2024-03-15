import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../services/users';

const useUsers = () => {
    const { data: users, error, isError, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000 * 5,
    })
  return {
    users,
    isError,
    error,
    isLoading
  }
};

export default useUsers