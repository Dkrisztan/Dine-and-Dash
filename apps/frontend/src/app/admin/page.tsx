'use client';

import { UserDto } from '@/api';
import { OrderTable } from '@/components/data-tables/OrderTable';
import { RestaurantTable } from '@/components/data-tables/RestaurantTable';
import { UserTable } from '@/components/data-tables/UserTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeleteUser } from '@/hooks/admin/useDeleteUser';
import { useUsers } from '@/hooks/admin/useUsers';
import { useRestaurant } from '@/hooks/restaurant/useRestaurant';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { data: users } = useUsers();
  const { data: restaurants } = useRestaurant();
  const { data: user, trigger } = useDeleteUser();

  const deleteUser = async (user: UserDto) => {
    await trigger(user);
  };

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
            <UserTable data={users ?? []} deleteUser={deleteUser} />
          </TabsContent>
          <TabsContent value='orders'>
            <OrderTable data={[]} />
          </TabsContent>
          <TabsContent value='restaurants'>
            <RestaurantTable data={restaurants ?? []} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
