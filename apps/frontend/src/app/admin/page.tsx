import { Header } from '@/app/admin/Header';
import { person } from '@/components/data';
import { OrderTable } from '@/components/OrderTable';
import { RestaurantTable } from '@/components/RestaurantTable';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserTable } from '@/components/UserTable';

export default function Admin() {
  return (
    <>
      <div className='flex flex-row justify-end px-5 pt-5 gap-2'>
        <Header />
        <ModeToggle />
      </div>
      <div className='p-10'>
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
            <OrderTable data={person} />
          </TabsContent>
          <TabsContent value='restaurants'>
            <RestaurantTable data={person} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
