import useSWR from 'swr';

import { paymentApi } from '@/network/api';

type PaymentIntentData = {
  clientSecret: string;
};

export function usePaymentIntent(id: string | undefined) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return useSWR<PaymentIntentData | undefined>(['usePaymentIntent', id], async () => {
    if (!id) return undefined;
    const response = await paymentApi.paymentControllerCreatePaymentIntent(id);
    return response.data;
  });
}
