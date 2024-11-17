import useSWRMutation from 'swr/mutation';

import { CreateRestaurantDto } from '@/api';
import { userRestaurantApi } from '@/network/api';

export function useCreateRestaurant() {
  const { data, error, isMutating, trigger } = useSWRMutation('useCreateRestaurant', async (_: string, { arg }: { arg: CreateRestaurantDto }) => {
    const response = await userRestaurantApi.restaurantControllerCreateForCurrentUser(arg);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
