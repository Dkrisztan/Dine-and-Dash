import { Suspense } from 'react';

import AuthCallback from '@/app/auth/callback/AuthCallback';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <AuthCallback />
    </Suspense>
  );
}
