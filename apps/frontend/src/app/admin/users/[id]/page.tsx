'use client';

import { notFound } from 'next/navigation';

import Spinner from '@/components/Spinner';
import { useOrder } from '@/hooks/admin/useOrder';
import { useUser } from '@/hooks/admin/useUser';
import { Param } from '@/lib/param';

export default function UserPage(props: Param) {
  const { id } = props.params;
  const { data: user, isLoading } = useUser(id);
  const { data: orders, isLoading: orderLoading } = useOrder(id);

  // make this to a skeleton once the design is ready
  if (isLoading || orderLoading) {
    return (
      <Spinner size='large'>
        <span className='text-xl'>Loading...</span>
      </Spinner>
    );
  }

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {orders?.map((order) => (
        <div key={order.id}>
          <h2>{order.id}</h2>
        </div>
      ))}
    </div>
  );
}
