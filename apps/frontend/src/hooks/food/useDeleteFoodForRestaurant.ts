import useSWRMutation from 'swr/mutation';

import { userFoodApi } from '@/network/api';

export function useDeleteFoodForRestaurant(id: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(['useDeleteFoodForRestaurant', id], async () => {
    const response = await userFoodApi.foodControllerRemoveFromRestaurant(id);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
