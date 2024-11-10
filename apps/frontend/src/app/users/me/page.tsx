'use client';

import Image from 'next/image';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';

import Spinner from '@/components/Spinner';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrder } from '@/hooks/order/useOrder';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { data: user, isLoading, error } = useUserSelf();
  const { data: orders } = useOrder();

  if (error) {
    return <div>Some error occured</div>;
  }

  if (!user || isLoading) {
    return <Spinner />;
  }

  return (
    <Tabs defaultValue='profile-info' className='pt-6'>
      <div className='flex items-center justify-center'>
        <TabsList className='h-11'>
          <TabsTrigger value='profile-info' className='px-24 text-xl'>
            Profile Info
          </TabsTrigger>
          <TabsTrigger value='orders' className='px-24 text-xl'>
            Orders
          </TabsTrigger>
          <TabsTrigger value='addresses' className='px-24 text-xl'>
            Addresses
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='profile-info' className='border-2 w-1/2 mx-auto my-5 py-5 flex flex-col justify-center items-center rounded-md'>
        <div className='w-full px-10 flex flex-row items-center gap-8'>
          <div className='flex-shrink-0'>
            <Image src={user.image} alt='avatar' width={150} height={150} className='rounded-full' />
          </div>
          <div className='flex flex-col gap-2 pl-2'>
            <span className='text-2xl font-bold'>{user.name}</span>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='email' className='text-lg font-bold'>
                <div className='flex flex-row items-center gap-1'>
                  <MdOutlineEmail />
                  Email:
                </div>
              </Label>
              <span id='email' className='text-lg'>
                {user.email}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Label htmlFor='phone' className='text-lg font-bold'>
                <div className='flex flex-row items-center gap-1'>
                  <MdOutlinePhone />
                  Phone:
                </div>
              </Label>
              <span id='phone' className='text-lg'>
                {user.phone || 'Not provided'}
              </span>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value='orders'>{orders?.map((order) => <div key={order.id}>{order.id}</div>)}</TabsContent>
      <TabsContent value='addresses'></TabsContent>
    </Tabs>
  );
}
