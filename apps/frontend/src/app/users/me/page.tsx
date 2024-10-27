'use client';

import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { data: user } = useUserSelf();
  return <div className='container px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>{user?.name}</div>;
}
