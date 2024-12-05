import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export function useStripeIntent(clientSecret: string) {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    if (!stripe) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setMessage(paymentIntent?.status ? '' : undefined);
    });
  }, [stripe]);
  return { message };
}
