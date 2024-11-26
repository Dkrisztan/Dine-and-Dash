import useSWRMutation from 'swr/mutation';

import { orderApi } from '@/network/api';

export function useCreateOrder() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    'useCreateOrder',
    async (
      _: string,
      {
        arg,
      }: {
        arg: string;
      }
    ) => {
      const response = await orderApi.orderControllerCreateOrderFromCart(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
