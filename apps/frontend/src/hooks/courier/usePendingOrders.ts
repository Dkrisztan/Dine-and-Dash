import useSWR, { mutate } from 'swr';

import { courierOrderApi } from '@/network/api';

export function usePendingOrders() {
  const { data, error, isLoading } = useSWR('usePendingOrders', async () => {
    const response = await courierOrderApi.courierOrderControllerGetAllPendingOrders();
    return response.data;
  });

  const refresh = () => {
    mutate('usePendingOrders');
  };

  return { data, error, isLoading, refresh };
}
