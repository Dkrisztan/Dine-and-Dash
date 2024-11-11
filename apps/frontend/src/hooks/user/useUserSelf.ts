import useSWR, { mutate } from 'swr';

import { userApi } from '@/network/api';

export function useUserSelf() {
  const { data, isLoading, error } = useSWR('useUserSelf', async () => {
    const response = await userApi.userControllerMe();
    return response.data;
  });

  const refreshUser = () => {
    mutate('useUserSelf');
  };

  return { data, isLoading, error, refreshUser };
}
