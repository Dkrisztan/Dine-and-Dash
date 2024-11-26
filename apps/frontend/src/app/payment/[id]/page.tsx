'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';

import { CheckoutForm } from '@/components/checkout-form/CheckoutForm';
import Spinner from '@/components/Spinner';
import { usePaymentIntent } from '@/hooks/payment/usePaymentIntent';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage() {
  const { resolvedTheme } = useTheme();
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
    appearance: {
      theme: 'flat',
      variables: {
        fontFamily: ' "Gill Sans", sans-serif',
        fontLineHeight: '1.5',
        borderRadius: '10px',
        colorBackground: '#F6F8FA',
        accessibleColorOnColorPrimary: '#262626',
      },
      rules: {
        '.Block': {
          backgroundColor: 'var(--colorBackground)',
          boxShadow: 'none',
          padding: '12px',
        },
        '.Input': {
          padding: '12px',
        },
        '.Input:disabled, .Input--invalid:disabled': {
          color: 'lightgray',
        },
        '.Tab': {
          padding: '10px 12px 8px 12px',
          border: 'none',
        },
        '.Tab:hover': {
          border: 'none',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
        },
        '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
          border: 'none',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
        },
        '.Label': {
          fontWeight: '500',
          color: resolvedTheme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    clientSecret: paymentIntent.data?.clientSecret,
  };

  return (
    <div className='w-1/3 mx-auto'>
      <h1 className='text-2xl my-5'>Rendelés kifizetése</h1>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm clientSecret={paymentIntent.data.clientSecret} orderId={id} />
      </Elements>
    </div>
  );
}
