import { useQueryClient } from '@tanstack/react-query';
const useToken = () => {

    const client = useQueryClient()
    const token = client.getQueryData(['token']) as string

  return { token }
};

export default useToken