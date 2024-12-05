'use client';

import FinishedOrders from '@/components/finished-orders/FinishedOrders';
import IncomingOrders from '@/components/incoming-orders/IncomingOrders';
import Spinner from '@/components/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMyRestaurantOrders } from '@/hooks/restaurant/useMyRestaurantOrders';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function MyRestaurantOrdersPage() {
  const { data: user, isLoading, error } = useUserSelf();
  const getOrders = useMyRestaurantOrders();

  const incOrders = getOrders.data?.filter((order) => order.status !== 'FINISHED' && order.status !== 'CANCELLED');
  const pastOrders = getOrders.data?.filter((order) => order.status === 'FINISHED' || order.status === 'CANCELLED');

  if (!getOrders.data) {
    return <div>No deliveries available at the moment</div>;
  }

  if (error) {
    return <div>Some error occurred</div>;
  }

  if (!user || isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col items-center space-y-5'>
      <Tabs defaultValue='available' className='w-1/2 mx-auto mt-6 rounded-md'>
        <div className='flex justify-center'>
          <TabsList className='h-11'>
            <TabsTrigger value='available' className='px-24 text-lg'>
              Incoming Orders
            </TabsTrigger>
            <TabsTrigger value='my-deliveries' className='px-24 text-lg'>
              Past Orders
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='available' className='py-5 px-8'>
          <IncomingOrders orders={incOrders} />
        </TabsContent>
        <TabsContent value='my-deliveries' className='py-5 px-8'>
          <FinishedOrders orders={pastOrders} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
