import useSWR from 'swr';

import { userApi } from '@/network/api';

export function useUserSelf() {
  return useSWR('useUserSelf', async () => {
    const response = await userApi.userControllerMe();
    return response.data;
  });
}
