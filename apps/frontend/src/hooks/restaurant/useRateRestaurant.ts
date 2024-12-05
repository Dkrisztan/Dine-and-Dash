import useSWRMutation from 'swr/mutation';

import { userRestaurantApi } from '@/network/api';

type RateRestaurantArgs = {
  restaurantId: string;
  score: number;
};

export function useRateRestaurant() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    'useRateRestaurant',
    async (
      _key: string,
      {
        arg,
      }: {
        arg: RateRestaurantArgs;
      }
    ) => {
      const { restaurantId, score } = arg;
      const response = await userRestaurantApi.restaurantControllerRate(restaurantId, { score });
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
