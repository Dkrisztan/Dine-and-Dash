import useSWR, { mutate } from 'swr';

import { orderApi } from '@/network/api';

export function useOrder() {
  const { data, error, isLoading } = useSWR('useOrder', async () => {
    const response = await orderApi.orderControllerFindAllForCurrentUser();
    return response.data;
  });

  const refresh = async () => {
    mutate('useOrder');
  };

  return { data, error, isLoading, refresh };
}
