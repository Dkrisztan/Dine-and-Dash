import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

import { UserDto } from '@/api';
import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import Spinner from '@/components/Spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FancyMultiSelect, RestaurantTag } from '@/components/ui/fancy-multi-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Ratings from '@/components/ui/ratings';
import { useCreateRestaurant } from '@/hooks/user/useCreateRestaurant';
import { useDeleteRestaurant } from '@/hooks/user/useDeleteRestaurant';
import { useUpdateRestaurant } from '@/hooks/user/useUpdateRestaurant';

export default function Restaurant({ user, refreshUser }: { user: UserDto; refreshUser: () => void }) {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const router = useRouter();

  const createRestaurant = useCreateRestaurant();
  const deleteRestaurant = useDeleteRestaurant();
  const updateRestaurant = useUpdateRestaurant();

  const restaurant = user.ownerOf;
  let rating;
  if (restaurant) {
    rating = restaurant.rating.reduce((acc, curr) => acc + curr, 0) / (restaurant.rating.length - 1);
  }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    addresses: '',
    tags: [] as { value: RestaurantTag; label: string }[],
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagsChange = (newTags: { value: RestaurantTag; label: string }[]) => {
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const handleCreateSubmit = async () => {
    await createRestaurant.trigger({
      name: formData.name,
      description: formData.description,
      addresses: [formData.addresses],
      tags: formData.tags.map((tag) => tag.value),
      image: formData.image,
    });
    setOpenCreate(false);
    toast.success('Created restaurant successfully!');
    refreshUser();
  };

  const handleEditSubmit = async () => {
    await updateRestaurant.trigger({
      name: formData.name,
      description: formData.description,
      addresses: [formData.addresses],
      tags: formData.tags.map((tag) => tag.value),
      image: formData.image,
    });
    setOpenEdit(false);
    toast.success('Updated restaurant successfully!');
    refreshUser();
  };

  const populateEditForm = () => {
    if (restaurant) {
      setFormData({
        name: restaurant.name,
        description: restaurant.description,
        addresses: restaurant.addresses[0],
        tags: restaurant.tags.map((tag: string) => ({
          value: tag as RestaurantTag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase(),
        })),
        image: restaurant.image,
      });
      setOpenEdit(true);
    }
  };

  if (!restaurant) {
    return (
      <div className='flex flex-col items-center justify-center min-h-md min-w-md'>
        <span className='text-2xl font-bold mb-5'>You don&apos;t have a restaurant yet.</span>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-1/2 gap-2'>
              <FaPlus />
              Create Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create a restaurant</DialogTitle>
              <DialogDescription>Make sure to fill every field.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' name='name' value={formData.name} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Input id='description' name='description' value={formData.description} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='addresses' className='text-right'>
                  Addresses
                </Label>
                <Input id='addresses' name='addresses' value={formData.addresses} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='tags' className='text-right'>
                  Tags
                </Label>
                <div className='col-span-3'>
                  <FancyMultiSelect selected={formData.tags} onSelectedChange={handleTagsChange} />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='image' className='text-right'>
                  Image
                </Label>
                <CustomUploadButton
                  onComplete={(url: string) => {
                    setFormData((prevProfile) => ({
                      ...prevProfile,
                      image: url,
                    }));
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' variant='outline' onClick={handleCreateSubmit}>
                {createRestaurant.isMutating ? <Spinner /> : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-md min-w-md'>
      <div className='w-full max-w-sm'>
        <Card className='mx-auto'>
          <CardHeader className='p-0 mb-2'>
            <Image src={restaurant.image} width={300} height={200} alt='Picture of a restaurant' className='rounded-t-xl w-full h-48 object-cover' />
          </CardHeader>
          <CardContent>
            <CardTitle className='text-xl font-semibold mb-2'>{restaurant.name}</CardTitle>
            <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>{restaurant.description}</p>
            <div className='flex items-center gap-1 flex-wrap'>
              {restaurant.tags.map((tag, index) => (
                <Badge key={index} variant={'secondary'} className='text-xs'>
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className='flex flex-row items-center justify-between'>
            <Ratings value={rating ? rating : 0} size={15} variant='yellow' />
            <div className='flex gap-2'>
              <Button
                variant='secondary'
                size='icon'
                onClick={() => {
                  router.push(`/owner/restaurant`);
                }}
              >
                <FaEye fontSize={24} />
              </Button>
              <Button variant='secondary' size='icon' onClick={populateEditForm}>
                <MdEdit fontSize={24} />
              </Button>
              <Button
                variant='destructive'
                size='icon'
                onClick={async () => {
                  await deleteRestaurant.trigger();
                  refreshUser();
                }}
              >
                <MdDelete fontSize={24} />
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit restaurant</DialogTitle>
              <DialogDescription>Make sure to update all necessary fields.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' name='name' value={formData.name} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-right'>
                  Description
                </Label>
                <Input id='description' name='description' value={formData.description} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='addresses' className='text-right'>
                  Addresses
                </Label>
                <Input id='addresses' name='addresses' value={formData.addresses} onChange={handleInputChange} className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='tags' className='text-right'>
                  Tags
                </Label>
                <div className='col-span-3'>
                  <FancyMultiSelect selected={formData.tags} onSelectedChange={handleTagsChange} />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='image' className='text-right'>
                  Image
                </Label>
                <CustomUploadButton
                  onComplete={(url: string) => {
                    setFormData((prevProfile) => ({
                      ...prevProfile,
                      image: url,
                    }));
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit' variant='outline' onClick={handleEditSubmit}>
                {updateRestaurant.isMutating ? <Spinner /> : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
