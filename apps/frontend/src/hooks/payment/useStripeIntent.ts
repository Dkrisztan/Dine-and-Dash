import { useStripe } from '@stripe/react-stripe-js';
import { PaymentIntent } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export function useStripeIntent(clientSecret: string) {
  const stripe = useStripe();
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    if (!stripe) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setMessage(paymentIntent?.status ? StatusMessages[paymentIntent.status] : undefined);
    });
  }, [stripe]);
  return { message };
}

const StatusMessages: Record<PaymentIntent['status'], string> = {
  succeeded: 'Fizetés sikeres!',
  processing: 'Fizetés folyamatban...',
  requires_payment_method: 'A fizetés nem sikerült, próbáld meg újra.',
  canceled: 'A fizetés megszakadt.',
  requires_action: 'A fizetés nem sikerült, próbáld meg újra.',
  requires_confirmation: 'A fizetés nem sikerült, próbáld meg újra.',
  requires_capture: 'A fizetés nem sikerült, próbáld meg újra.',
};
