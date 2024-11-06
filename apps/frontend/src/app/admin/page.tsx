'use client';

import { OrderTable } from '@/components/data-tables/OrderTable';
import { RestaurantTable } from '@/components/data-tables/RestaurantTable';
import { UserTable } from '@/components/data-tables/UserTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUsers } from '@/hooks/admin/useUsers';

export default function AdminPage() {
  const { data: users } = useUsers();
  return (
    <>
      <div className='px-8 py-1'>
        <Tabs defaultValue='users'>
          <div className='flex items-center lg:absolute lg:py-4 md:py-2'>
            <TabsList>
              <TabsTrigger value='users'>Users</TabsTrigger>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='restaurants'>Restaurants</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='users'>
            <UserTable data={users ?? []} />
          </TabsContent>
          <TabsContent value='orders'>
            <OrderTable data={[]} />
          </TabsContent>
          <TabsContent value='restaurants'>
            <RestaurantTable data={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
