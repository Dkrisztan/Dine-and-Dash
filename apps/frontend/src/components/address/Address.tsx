import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateSelf } from '@/hooks/user/useUpdateSelf';

export default function Addresses({ addresses, refreshUser }: { addresses: string[]; refreshUser: () => void }) {
  const updateSelf = useUpdateSelf();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const [editingAddress, setEditingAddress] = useState('');
  const [address, setAddress] = useState<string[]>(addresses);

  const handleInputChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setInputAddress(value);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedAddresses = [...address, inputAddress];
      setAddress(updatedAddresses);
      await updateSelf.trigger({ addresses: updatedAddresses });
      setInputAddress('');
      setOpenAddDialog(false);
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

  const handleEditAddress = (currentAddress: string) => {
    setEditingAddress(currentAddress);
    setInputAddress(currentAddress);
    setOpenEditDialog(true);
  };

  const handleSaveEditedAddress = async () => {
    try {
      const updatedAddresses = address.map((addr) => (addr === editingAddress ? inputAddress : addr));
      setAddress(updatedAddresses);
      await updateSelf.trigger({ addresses: updatedAddresses });
      setInputAddress('');
      setEditingAddress('');
      setOpenEditDialog(false);
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

  const handleDeleteAddress = async (currentAddress: string) => {
    try {
      const updatedAddresses = address.filter((addr) => addr !== currentAddress);
      setAddress(updatedAddresses);
      await updateSelf.trigger({ addresses: updatedAddresses });
      refreshUser();
    } catch (error) {
      toast.error(`Failed to update profile!`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogTrigger asChild>
          <Button variant='outline' className='w-1/2 gap-2'>
            <FaPlus />
            Add Address
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>Enter the new address and click save.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='newAddress' className='text-right'>
                Address
              </Label>
              <Input id='newAddress' value={inputAddress} onChange={handleInputChange} className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={handleSaveChanges}>
              {updateSelf.isMutating ? <Spinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div>
        {address.map((addr) => (
          <div key={addr} className='flex flex-row justify-center items-center gap-4 text-xl'>
            {addr}
            <div>
              <Button variant='ghost' size='icon' onClick={() => handleEditAddress(addr)}>
                <MdEdit fontSize={24} />
              </Button>
              <Button variant='ghost' size='icon' onClick={() => handleDeleteAddress(addr)}>
                <MdDelete fontSize={24} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Modify the address and click save.</DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='editAddress' className='text-right'>
                Address
              </Label>
              <Input id='editAddress' value={inputAddress} onChange={handleInputChange} className='col-span-3' />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={handleSaveEditedAddress}>
              {updateSelf.isMutating ? <Spinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
