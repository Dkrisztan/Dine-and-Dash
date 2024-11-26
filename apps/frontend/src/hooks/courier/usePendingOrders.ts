import useSWR from 'swr';

import { courierOrderApi } from '@/network/api';

export function usePendingOrders() {
  const { data, error, isLoading } = useSWR('usePendingOrders', async () => {
    const response = await courierOrderApi.courierOrderControllerGetAllPendingOrders();
    return response.data;
  });

  return { data, error, isLoading };
}
