import useSWRMutation from 'swr/mutation';

import { orderApi } from '@/network/api';

export function useCreateOrder() {
  const { data, error, isMutating, trigger } = useSWRMutation('useCreateOrder', async () => {
    const response = await orderApi.orderControllerCreateOrderFromCart();
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
