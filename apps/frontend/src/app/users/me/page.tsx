'use client';

import { FaPlus } from 'react-icons/fa';
import { IoRestaurantOutline } from 'react-icons/io5';

import Address from '@/components/address/Address';
import Order from '@/components/order/Order';
import ProfileInfo from '@/components/profile-info/ProfileInfo';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrder } from '@/hooks/order/useOrder';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { data: user, isLoading, error, refreshUser } = useUserSelf();
  const { data: orders } = useOrder();

  if (error) {
    return <div>Some error occurred</div>;
  }

  if (!user || isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col items-center'>
      <Tabs defaultValue='profile-info' className='w-1/2 mx-auto mt-6 border-0 rounded-md'>
        <div className='flex justify-center border-b-0'>
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
        <TabsContent value='profile-info' className='py-5 px-8 flex flex-col'>
          <ProfileInfo user={user} refreshUser={refreshUser} />
        </TabsContent>
        <TabsContent value='orders' className='py-5 px-8'>
          <Order orders={orders} />
        </TabsContent>
        <TabsContent value='addresses' className='py-5 px-8'>
          <Address addresses={user.addresses} />
        </TabsContent>
        <TabsContent value='my-restaurant' className='py-0 px-8'>
          <div className='flex flex-col items-center justify-center gap-8'>
            {user.ownerOf ? (
              <p>this is your restaurant {user.ownerOf.id}</p>
            ) : (
              <>
                <span className='text-2xl font-bold'>You don&apos;t have a restaurant yet.</span>
                <Button variant='outline' className='w-1/2 gap-2'>
                  <FaPlus />
                  Create Restaurant
                </Button>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
