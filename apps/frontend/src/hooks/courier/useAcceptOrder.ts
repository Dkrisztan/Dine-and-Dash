import useSWRMutation from 'swr/mutation';

import { OrderId } from '@/api';
import { courierOrderApi } from '@/network/api';

export function useAcceptOrder() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    'useAcceptOrder',
    async (
      _: string,
      {
        arg,
      }: {
        arg: OrderId;
      }
    ) => {
      const response = await courierOrderApi.courierOrderControllerAcceptOrder(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
