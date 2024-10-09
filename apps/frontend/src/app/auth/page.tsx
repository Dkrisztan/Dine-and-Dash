import { Suspense } from 'react';

import AuthCallback from '@/app/auth/callback/page';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
