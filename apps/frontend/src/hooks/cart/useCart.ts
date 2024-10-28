import useSWR, { mutate } from 'swr';

import { cartApi } from '@/network/api';

export function useCart() {
  const { data, error, isLoading } = useSWR('useCart', async () => {
    const response = await cartApi.cartControllerGetCart();
    return response.data;
  });

  const refreshCart = () => {
    mutate('useCart');
  };

  return { data, error, isLoading, refreshCart };
}
