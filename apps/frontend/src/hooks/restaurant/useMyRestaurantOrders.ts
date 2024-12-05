import useSWR, { mutate } from 'swr';

import { userRestaurantApi } from '@/network/api';

export function useMyRestaurantOrders() {
  const { data, error, isLoading } = useSWR('useMyRestaurantOrders', async () => {
    const response = await userRestaurantApi.restaurantControllerGetRestaurantOrders();
    return response.data;
  });

  const refresh = () => {
    mutate('useMyRestaurantOrders');
  };

  return { data, error, isLoading, refresh };
}
