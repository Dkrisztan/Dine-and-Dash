'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        localStorage.setItem('accessToken', token);
      } catch (error) {
        localStorage.setItem('accessToken', token);
      }
      router.push('/admin');
    }
  }, [searchParams, router]);

  return <div>Logging in...</div>;
}

export function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
