import { PaymentElement } from '@stripe/react-stripe-js';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { useHandlePayment } from '@/hooks/payment/useHandlePayment';
import { useStripeIntent } from '@/hooks/payment/useStripeIntent';

interface CheckoutFormProps {
  clientSecret: string;
  orderId: string;
}

export function CheckoutForm({ clientSecret, orderId }: CheckoutFormProps) {
  const payment = useHandlePayment(orderId);
  const stripeIntent = useStripeIntent(clientSecret);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await payment.handle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {stripeIntent.message && <p className='text-red-500 my-5'>{stripeIntent.message}</p>}
      {payment.message && <p className='text-red-500 my-5'>{payment.message}</p>}
      <Button className='mt-3'>Fizetés</Button>
    </form>
  );
}
