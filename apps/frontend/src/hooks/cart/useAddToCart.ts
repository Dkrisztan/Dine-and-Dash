import useSWRMutation from 'swr/mutation';

import { AddToCartDto } from '@/api';
import { cartApi } from '@/network/api';

export function useAddToCart() {
  const { data, error, isMutating, trigger } = useSWRMutation('useAddToCart', async (_: string, { arg }: { arg: AddToCartDto }) => {
    const response = await cartApi.cartControllerAddToCart(arg);
    return response.data;
  });

  return { data, error, isMutating, trigger };
}
