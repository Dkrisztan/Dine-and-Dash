'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';

import { CheckoutForm } from '@/components/checkout-form/CheckoutForm';
import Spinner from '@/components/Spinner';
import { usePaymentIntent } from '@/hooks/payment/usePaymentIntent';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const paymentIntent = usePaymentIntent(id);

  if (paymentIntent.isLoading)
    return (
      <main>
        <Spinner />
      </main>
    );
  if (!paymentIntent.data) return null;

  const options: StripeElementsOptions = {
    clientSecret: paymentIntent.data?.clientSecret,
  };

  return (
    <main>
      <h1>Rendelés kifizetése</h1>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm clientSecret={paymentIntent.data.clientSecret} orderId={id} />
      </Elements>
    </main>
  );
}
