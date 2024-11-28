import useSWRMutation from 'swr/mutation';

import { OrderId } from '@/api';
import { courierOrderApi } from '@/network/api';

export function useFinishOrder() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    'useFinishOrder',
    async (
      _: string,
      {
        arg,
      }: {
        arg: OrderId;
      }
    ) => {
      const response = await courierOrderApi.courierOrderControllerFinishOrder(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
