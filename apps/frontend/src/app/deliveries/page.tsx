'use client';

import AvailableOrders from '@/components/available-orders/AvailableOrders';
import MyDeliveries from '@/components/my-deliveries/MyDeliveries';
import Spinner from '@/components/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMyDeliveries } from '@/hooks/courier/useMyDeliveries';
import { usePendingOrders } from '@/hooks/courier/usePendingOrders';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function DeliveriesPage() {
  const { data: user, isLoading, error } = useUserSelf();
  const { data: orders, refresh: refreshPendingOrders } = usePendingOrders();
  const { data: myDeliveries, refresh: refreshMyDeliveries } = useMyDeliveries();

  if (!orders) {
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
              Available Deliveries
            </TabsTrigger>
            <TabsTrigger value='my-deliveries' className='px-24 text-lg'>
              My Deliveries
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='available' className='py-5 px-8'>
          <AvailableOrders orders={orders} refresh={refreshPendingOrders} />
        </TabsContent>
        <TabsContent value='my-deliveries' className='py-5 px-8'>
          <MyDeliveries orders={myDeliveries} refresh={refreshMyDeliveries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
