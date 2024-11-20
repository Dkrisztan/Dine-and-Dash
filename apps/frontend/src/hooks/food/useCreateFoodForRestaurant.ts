import useSWRMutation from 'swr/mutation';

import { CreateFoodDto } from '@/api';
import { userFodApi } from '@/network/api';

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
      const response = await userFodApi.foodControllerAddFoodToCurrentUserRestaurant(arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
