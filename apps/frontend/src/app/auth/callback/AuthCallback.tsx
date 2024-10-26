// AuthCallback.tsx
'use client';

import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');

      if (token) {
        try {
          // Set the cookie
          Cookies.set('accessToken', token, {
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
          });

          // Dispatch a custom event that TopNav will listen for
          window.dispatchEvent(new Event('auth-changed'));

          // Small delay to ensure cookie is set and event is processed
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Navigate back
          router.push('/');
        } catch (error) {
          console.error('Auth error:', error);
        }
      }
      setIsProcessing(false);
    };

    handleAuth();
  }, [searchParams, router]);

  if (isProcessing) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full' />
        <span className='ml-3'>Logging in...</span>
      </div>
    );
  }

  return null;
}
