import useSWRMutation from 'swr/mutation';

import { UpdateUserDto } from '@/api';
import { userApi } from '@/network/api';

export function useUpdateSelf() {
  const { data, error, isMutating, trigger } = useSWRMutation(['useUpdateSelf'], async (_: string[], { arg }: { arg: UpdateUserDto }) => {
    const response = await userApi.userControllerUpdateProfile(arg);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
