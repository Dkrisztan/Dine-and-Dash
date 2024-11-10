import useSWR from 'swr';

import { adminOrderApi } from '@/network/api';

export function useOrder(id: string) {
  const { data, isLoading, error } = useSWR(['useOrder', id], async () => {
    const response = await adminOrderApi.adminOrderControllerFindAllForUser(id);
    return response.data;
  });

  return { data, isLoading, error };
}
