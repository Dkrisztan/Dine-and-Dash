import useSWR, { mutate } from 'swr';

import { userFoodApi } from '@/network/api';

export function useFoodForRestaurant() {
  const { data, error, isLoading } = useSWR('useFoodForRestaurant', async () => {
    const response = await userFoodApi.foodControllerFindAllForOwnedRestaurant();
    return response.data;
  });

  const refresh = () => {
    mutate('useFoodForRestaurant');
  };

  return { data, error, isLoading, refresh };
}
