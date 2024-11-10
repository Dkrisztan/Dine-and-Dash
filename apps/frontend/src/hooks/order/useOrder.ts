import useSWR from 'swr';

import { orderApi } from '@/network/api';

export function useOrder() {
  const { data, error, isLoading } = useSWR('useOrder', async () => {
    const response = await orderApi.orderControllerFindAllForCurrentUser();
    return response.data;
  });

  return { data, error, isLoading };
}
