'use client';

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';

import CustomUploadButton from '@/components/custom-upload-button/CustomUploadButton';
import FoodCardForOwner from '@/components/food/FoodCardForOwner';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateFoodForRestaurant } from '@/hooks/food/useCreateFoodForRestaurant';
import { useFoodForRestaurant } from '@/hooks/food/useFoodForRestaurant';

export default function OwnedRestaurantPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const { data: foods, isLoading, refresh: refreshFoods } = useFoodForRestaurant();
  const addFood = useCreateFoodForRestaurant();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async () => {
    await addFood.trigger({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
    });
    setOpenCreate(false);
    toast.success('Created food successfully!');
    refreshFoods();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!foods) {
    return <div>Some error occured!</div>;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-md min-w-md'>
        {foods.length === 0 && <span className='text-2xl font-bold mb-5'>You don&apos;t have any food added yet.</span>}
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-1/2 gap-2'>
              <FaPlus />
              Add Food
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Food</DialogTitle>
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
              <Button type='submit' onClick={handleCreateSubmit}>
                {addFood.isMutating ? <Spinner /> : 'Save changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
        {foods.map((item, index) => {
          return (
            <div key={index} className='container mx-auto py-3'>
              <FoodCardForOwner food={item} refreshFoodsAction={refreshFoods} />
            </div>
          );
        })}
      </div>
    </>
  );
}
