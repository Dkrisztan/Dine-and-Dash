import useSWR from 'swr';

import { restaurantApi } from '@/network/api';

export function useRestaurant() {
  return useSWR('useRestaurant', async () => {
    const response = await restaurantApi.restaurantControllerFindAll();
    return response.data;
  });
}
