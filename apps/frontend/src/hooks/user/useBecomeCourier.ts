import useSWRMutation from 'swr/mutation';

import { userApi } from '@/network/api';

export function useBecomeCourier() {
  const { data, error, isMutating, trigger } = useSWRMutation('useBecomeCourier', async () => {
    const response = await userApi.userControllerBecomeCourier();
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
