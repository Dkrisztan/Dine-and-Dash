import useSWR, { mutate } from 'swr';

import { adminUserApi } from '@/network/api';

export function useUser(id: string) {
  const { data, isLoading, error } = useSWR(['useUser', id], async () => {
    const response = await adminUserApi.adminUserControllerFindOne(id);
    return response.data;
  });

  const refreshUser = () => {
    mutate(['useUser', id]);
  };

  return { data, isLoading, error, refreshUser };
}
