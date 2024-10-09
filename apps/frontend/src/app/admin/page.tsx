import { order, person } from '@/components/data';
import { OrderTable } from '@/components/OrderTable';
import { RestaurantTable } from '@/components/RestaurantTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserTable } from '@/components/UserTable';

export default function Admin() {
  return (
    <>
      {/*<Test />*/}
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
            <UserTable data={person} />
          </TabsContent>
          <TabsContent value='orders'>
            <OrderTable data={order} />
          </TabsContent>
          <TabsContent value='restaurants'>
            <RestaurantTable data={person} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
