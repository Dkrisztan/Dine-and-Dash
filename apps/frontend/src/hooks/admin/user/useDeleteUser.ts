import useSWRMutation from 'swr/mutation';

import { adminUserApi } from '@/network/api';

export function useDeleteUser(id: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(['useDeleteUser', id], async () => {
    const response = await adminUserApi.adminUserControllerRemove(id);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
