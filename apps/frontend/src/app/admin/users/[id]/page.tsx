'use client';

import { notFound } from 'next/navigation';

import AdminProfileInfo from '@/components/admin-profile-info/AdminProfileInfo';
import Spinner from '@/components/Spinner';
import { useUser } from '@/hooks/admin/user/useUser';
import { Param } from '@/lib/param';

export default function UserPage(props: Param) {
  const { id } = props.params;
  const { data: user, isLoading, refreshUser } = useUser(id);

  if (isLoading) {
    return (
      <Spinner size='large'>
        <span className='text-xl'>Loading...</span>
      </Spinner>
    );
  }

  if (!user) {
    return notFound();
  }

  return <AdminProfileInfo user={user} refreshUser={refreshUser} />;
}
