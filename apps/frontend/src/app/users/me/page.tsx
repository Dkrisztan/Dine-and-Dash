'use client';

import { IoRestaurantOutline } from 'react-icons/io5';

import Address from '@/components/address/Address';
import Order from '@/components/order/Order';
import ProfileInfo from '@/components/profile-info/ProfileInfo';
import Restaurant from '@/components/restaurant/Restaurant';
import Spinner from '@/components/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrder } from '@/hooks/order/useOrder';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { data: user, isLoading, error, refreshUser } = useUserSelf();
  const { data: orders, refresh: refreshOrders } = useOrder();

  if (error) {
    return <div>Some error occurred</div>;
  }

  if (!user || isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col items-center space-y-5'>
      <Tabs defaultValue='profile-info' className='w-1/2 mx-auto mt-6 rounded-md'>
        <div className='flex justify-center'>
          <TabsList className='h-11'>
            <TabsTrigger value='profile-info' className='px-24 text-lg'>
              Profile Info
            </TabsTrigger>
            <TabsTrigger value='orders' className='px-24 text-lg'>
              Orders
            </TabsTrigger>
            <TabsTrigger value='addresses' className='px-24 text-lg'>
              Addresses
            </TabsTrigger>
            <TabsTrigger value='my-restaurant' className='px-24 text-lg gap-2'>
              My Restaurant
              <IoRestaurantOutline />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='profile-info' className='py-5 px-8'>
          <ProfileInfo user={user} refreshUser={refreshUser} />
        </TabsContent>
        <TabsContent value='orders' className='py-5 px-8'>
          <Order orders={orders} user={user} refreshOrders={refreshOrders} refreshUser={refreshUser} />
        </TabsContent>
        <TabsContent value='addresses' className='py-5 px-8'>
          <Address addresses={user.addresses} refreshUser={refreshUser} />
        </TabsContent>
        <TabsContent value='my-restaurant' className='py-5 px-8'>
          <Restaurant user={user} refreshUser={refreshUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
