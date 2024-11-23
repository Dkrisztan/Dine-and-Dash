import useSWRMutation from 'swr/mutation';

import { AdminUpdateUserDto } from '@/api';
import { adminUserApi } from '@/network/api';

export function useUpdateUser(id: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(
    ['useUpdateUser', id],
    async (
      _: string[],
      {
        arg,
      }: {
        arg: AdminUpdateUserDto;
      }
    ) => {
      const response = await adminUserApi.adminUserControllerUpdate(id, arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
