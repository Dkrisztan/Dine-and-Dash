import useSWRMutation from 'swr/mutation';

import { UpdateFoodDto } from '@/api';
import { userFoodApi } from '@/network/api';

export function useUpdateFoodForRestaurant(id: string) {
  const { data, error, isMutating, trigger } = useSWRMutation(
    ['useUpdateFoodForRestaurant', id],
    async (
      _: string[],
      {
        arg,
      }: {
        arg: UpdateFoodDto;
      }
    ) => {
      const response = await userFoodApi.foodControllerUpdateOneForRestaurant(id, arg);
      return response.data;
    }
  );

  return { data, error, isMutating, trigger };
}
