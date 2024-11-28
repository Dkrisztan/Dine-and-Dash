import useSWR, { mutate } from 'swr';

import { courierOrderApi } from '@/network/api';

export function useMyDeliveries() {
  const { data, error, isLoading } = useSWR('useMyDeliveries', async () => {
    const response = await courierOrderApi.courierOrderControllerGetMyDeliveries();
    return response.data;
  });

  const refresh = () => {
    mutate('useMyDeliveries');
  };

  return { data, error, isLoading, refresh };
}
