import useSWRMutation from 'swr/mutation';

import { UpdateRestaurantDto } from '@/api';
import { userRestaurantApi } from '@/network/api';

export function useUpdateRestaurant() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    ['useUpdateRestaurant'],
    async (
      _: string[],
      {
        arg,
      }: {
        arg: UpdateRestaurantDto;
      }
    ) => {
      const response = await userRestaurantApi.restaurantControllerUpdateOwnRestaurant(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
