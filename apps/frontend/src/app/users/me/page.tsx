'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { toast } from 'sonner';

import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrder } from '@/hooks/order/useOrder';
import { useUpdateSelf } from '@/hooks/user/useUpdateSelf';
import { useUserSelf } from '@/hooks/user/useUserSelf';

export const dynamic = 'force-dynamic';

type UserEdit = {
  name: string | undefined;
  phone: string | undefined;
};

export default function ProfilePage() {
  const { data: user, isLoading, error, refreshUser } = useUserSelf();
  const { data: orders } = useOrder();
  const updateSelf = useUpdateSelf();
  const [open, setOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState<UserEdit>({ name: user?.name, phone: user?.phone || '' });

  useEffect(() => {
    setUpdateUser({ name: user?.name, phone: user?.phone || '' });
  }, [user]);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setUpdateUser((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateSelf.trigger(updateUser);
      setOpen(false);
      toast.success('Profile updated successfully');
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

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
            <TabsTrigger value='my-restaurant' className='px-24 text-lg'>
              My Restaurant
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='profile-info' className='py-5 px-8 flex flex-col'>
          <div className='flex flex-row items-center gap-8'>
            <div className='flex flex-col items-center'>
              <Image src={user.image} alt='avatar' width={150} height={150} className='rounded-full' />
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant='outline' className='mt-5'>
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you are done.</DialogDescription>
                  </DialogHeader>
                  <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='name' className='text-right'>
                        Name
                      </Label>
                      <Input id='name' name='name' value={updateUser.name} onChange={handleInputChange} className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='phone' className='text-right'>
                        Phone
                      </Label>
                      <Input id='phone' name='phone' value={updateUser.phone} onChange={handleInputChange} className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                      <Label htmlFor='image' className='text-right'>
                        Image
                      </Label>
                      <CustomUploadButton
                        onComplete={() => {
                          refreshUser();
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type='submit' onClick={handleSaveChanges}>
                      {updateSelf.isMutating ? <Spinner /> : 'Save changes'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex flex-col gap-2 pl-2'>
              <span className='text-2xl font-bold'>{user.name}</span>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='email' className='text-lg font-bold'>
                  <div className='flex flex-row items-center gap-1'>
                    <MdOutlineEmail /> Email:
                  </div>
                </Label>
                <span id='email' className='text-lg'>
                  {user.email}
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <Label htmlFor='phone' className='text-lg font-bold'>
                  <div className='flex flex-row items-center gap-1'>
                    <MdOutlinePhone /> Phone:
                  </div>
                </Label>
                <span id='phone' className='text-lg'>
                  {user.phone || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='orders' className='py-5 px-8'>
          {orders?.map((order) => <div key={order.id}>{order.id}</div>)}
        </TabsContent>
        <TabsContent value='addresses' className='py-5 px-8'>
          <p>Your saved addresses will appear here.</p>
        </TabsContent>
        <TabsContent value='my-restaurant' className='py-5 px-8'>
          {user.ownerOf ? <p>this is the restaurant you own: {user.ownerOf.id}</p> : <p>You do not own a restaurant yet.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
