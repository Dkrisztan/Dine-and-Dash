'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { MdAttachMoney, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

import { FoodDto } from '@/api';
import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDeleteFoodForRestaurant } from '@/hooks/food/useDeleteFoodForRestaurant';
import { useUpdateFoodForRestaurant } from '@/hooks/food/useUpdateFoodForRestaurant';

export default function FoodCardForOwner({ food, refreshFoodsAction }: { food: FoodDto; refreshFoodsAction: () => void }) {
  const [openEdit, setOpenEdit] = useState(false);
  const deleteFood = useDeleteFoodForRestaurant(food.id);
  const updateFood = useUpdateFoodForRestaurant(food.id);

  const [formData, setFormData] = useState({
    name: food.name,
    description: food.description,
    price: food.price,
    image: food.image,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    await updateFood.trigger({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image,
    });
    setOpenEdit(false);
    toast.success('Updated food successfully!');
    refreshFoodsAction();
  };

  // asdf

  return (
    <Card>
      <CardHeader className='p-0 mb-2'>
        <Image src={food.image} width={400} height={400} alt='Picture of a food' className='rounded-t-xl w-full h-auto object-cover aspect-video' />
      </CardHeader>
      <CardContent>
        <CardTitle className='text-2xl font-semibold'>{food.name}</CardTitle>
        <p className='text-gray-500 dark:text-gray-400'>{food.description}</p>
        <CardFooter className='px-0 pb-1 pt-4 flex flex-row flex-wrap items-center justify-between'>
          <span className='text-xl flex flex-row items-center justify-center'>
            <MdAttachMoney className='text-xl' />
            {food.price}
          </span>
          <div className='flex flex-row justify-center items-center gap-2 rounded-3xl'>
            <Button
              variant='secondary'
              size='icon'
              onClick={() => {
                setOpenEdit(true);
              }}
            >
              <MdEdit fontSize={24} />
            </Button>
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
                    <Label htmlFor='price' className='text-right'>
                      Price
                    </Label>
                    <Input id='price' name='price' value={formData.price} onChange={handleInputChange} className='col-span-3' />
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
                    {updateFood.isMutating ? <Spinner /> : 'Save changes'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              variant='destructive'
              size='icon'
              onClick={async () => {
                await deleteFood.trigger();
                toast.warning('Food deleted successfully!');
                refreshFoodsAction();
              }}
            >
              <MdDelete fontSize={24} />
            </Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
