'use client';

import { useEffect, useState } from 'react';

import { UserDto } from '@/api';
import { userApi } from '@/network/api';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const [user, setUser] = useState<UserDto | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data: loggedInUser } = await userApi.userControllerMe();
      setUser(loggedInUser);
    };
    getUser().then((r) => r);
  }, []);
  return <div className='container px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>{user?.name}</div>;
}
