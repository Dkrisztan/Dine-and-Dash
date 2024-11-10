import useSWRMutation from 'swr/mutation';

import { UserDto } from '@/api';
import { adminUserApi } from '@/network/api';

export function useDeleteUser() {
  const { data, error, isMutating, trigger } = useSWRMutation('useDeleteUser', async (_: string, { arg }: { arg: UserDto }) => {
    const response = await adminUserApi.adminUserControllerRemove(arg.id);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
