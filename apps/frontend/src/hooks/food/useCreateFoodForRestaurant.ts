import useSWRMutation from 'swr/mutation';

import { CreateFoodDto } from '@/api';
import { userFoodApi } from '@/network/api';

export function useCreateFoodForRestaurant() {
  const { data, error, isMutating, trigger } = useSWRMutation(
    'useCreateFoodForRestaurant',
    async (
      _: string,
      {
        arg,
      }: {
        arg: CreateFoodDto;
      }
    ) => {
      const response = await userFoodApi.foodControllerAddFoodToCurrentUserRestaurant(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
