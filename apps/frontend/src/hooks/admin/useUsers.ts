import useSWR from 'swr';

import { adminUserApi } from '@/network/api';

export function useUsers() {
  return useSWR('useUsers', async () => {
    const response = await adminUserApi.adminUserControllerFindAll();
    return response.data;
  });
}
