import useSWR from 'swr';

import { paymentApi } from '@/network/api';

export function usePaymentIntent(id: string | undefined) {
  return useSWR(['usePaymentIntent', id], async () => {
    if (!id) return undefined;
    const response = await paymentApi.paymentControllerCreatePaymentIntent(id);
    return response.data;
  });
}
