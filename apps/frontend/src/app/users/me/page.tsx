'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  const { data: user } = useUserSelf();

  if (!user) {
    return <div>Some error occured</div>;
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
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
        <div>{user.name}</div>
      </TabsContent>
      <TabsContent value='orders'></TabsContent>
      <TabsContent value='addresses'></TabsContent>
    </Tabs>
  );
}
