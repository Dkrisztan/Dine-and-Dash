import useSWR from 'swr';

import { adminOrderApi } from '@/network/api';

export function useOrders() {
  return useSWR('useOrders', async () => {
    const response = await adminOrderApi.adminOrderControllerFindAll();
    return response.data;
  });
}
