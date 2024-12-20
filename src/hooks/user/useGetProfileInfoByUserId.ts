import { authFetcher } from '@/services/fetcher';
import { GetProfileInfoByUserIdResponse } from '@/services/profile/userApiTypes';
import useSWR from 'swr';

const useGetProfileInfoById = (userId: string | undefined) => {
  const { data, error, isLoading } = useSWR<GetProfileInfoByUserIdResponse>(
    `/user/public/account/${userId}`,
    authFetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 0,
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
};

export default useGetProfileInfoById;
