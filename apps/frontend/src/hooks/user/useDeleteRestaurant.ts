import useSWRMutation from 'swr/mutation';

import { userRestaurantApi } from '@/network/api';

export function useDeleteRestaurant() {
  const { data, error, isMutating, trigger } = useSWRMutation('useDeleteRestaurant', async () => {
    const response = await userRestaurantApi.restaurantControllerRemoveOwnRestaurant();
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
