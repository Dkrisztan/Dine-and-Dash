import Image from 'next/image';
import { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import { toast } from 'sonner';

import { AdminUpdateUserDtoRoleEnum, UserDto } from '@/api';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUpdateUser } from '@/hooks/admin/user/useUpdateUser';

export default function AdminProfileInfo({ user, refreshUser }: { user: UserDto; refreshUser: () => void }) {
  const updateUserAdmin = useUpdateUser(user.id);
  const [updateUser, setUpdateUser] = useState({
    role: user.role,
  });

  const handleSaveChanges = async () => {
    try {
      await updateUserAdmin.trigger(updateUser);
      toast.success('Profile updated successfully!');
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

  return (
    <div className='flex flex-row items-center justify-center gap-8 mt-5'>
      <div className='flex flex-col items-center'>
        <Image src={user.image} alt='avatar' width={150} height={150} className='rounded-full' />
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
        <div className='flex flex-row gap-2 items-center'>
          <Label htmlFor='role' className='text-lg font-bold'>
            <div className='flex flex-row items-center gap-1'>
              <FaUserShield /> Role:
            </div>
          </Label>
          <Select
            defaultValue={user.role}
            onValueChange={(value) =>
              setUpdateUser((prev) => ({
                ...prev,
                role: value as AdminUpdateUserDtoRoleEnum,
              }))
            }
          >
            <SelectTrigger className='w-32'>
              <SelectValue placeholder={user.role} />
            </SelectTrigger>
            <SelectContent>
              {['ADMIN', 'CUSTOMER', 'COURIER', 'OWNER'].map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant='outline' onClick={handleSaveChanges}>
            {updateUserAdmin.isMutating ? <Spinner /> : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
