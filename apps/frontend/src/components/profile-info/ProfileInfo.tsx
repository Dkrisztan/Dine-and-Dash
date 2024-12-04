import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { toast } from 'sonner';

import { UpdateUserDto, UserDto } from '@/api';
import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateSelf } from '@/hooks/user/useUpdateSelf';

export default function ProfileInfo({ user, refreshUser }: { user: UserDto; refreshUser: () => void }) {
  const updateSelf = useUpdateSelf();
  const [open, setOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState<UpdateUserDto>({
    name: user?.name,
    phone: user?.phone || '',
    image: user?.image,
  });

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
      toast.success('Profile updated successfully!');
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

  return (
    <div className='flex flex-row items-center justify-center gap-8'>
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
                  onComplete={(url: string) => {
                    setUpdateUser((prevProfile) => ({
                      ...prevProfile,
                      image: url,
                    }));
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' variant='outline' onClick={handleSaveChanges}>
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
  );
}
