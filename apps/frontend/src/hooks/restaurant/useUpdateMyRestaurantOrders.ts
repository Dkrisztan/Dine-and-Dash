import useSWRMutation from 'swr/mutation';

import { OrderStatusDto } from '@/api';
import { userRestaurantApi } from '@/network/api';

export function useUpdateMyRestaurantOrders(id: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(
    ['useUpdateMyRestaurantOrders', id],
    async (
      _: string[],
      {
        arg,
      }: {
        arg: OrderStatusDto;
      }
    ) => {
      const response = await userRestaurantApi.restaurantControllerUpdateRestaurantOrder(id, arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
