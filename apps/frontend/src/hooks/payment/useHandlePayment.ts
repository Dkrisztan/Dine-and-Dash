import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

export function useHandlePayment(orderId: string) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const handle = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/${orderId}/success`,
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage(error.message);
    }
    setIsLoading(false);
  };

  return { handle, message, isLoading };
}
