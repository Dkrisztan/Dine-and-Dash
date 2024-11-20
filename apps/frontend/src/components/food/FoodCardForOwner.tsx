'use client';

import Image from 'next/image';
import React from 'react';
import { MdAttachMoney, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'sonner';

import { FoodDto } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDeleteFoodForRestaurant } from '@/hooks/food/useDeleteFoodForRestaurant';

export default function FoodCardForOwner({ food, refreshFoodsAction }: { food: FoodDto; refreshFoodsAction: () => void }) {
  const deleteFood = useDeleteFoodForRestaurant(food.id);

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
            <Button variant='secondary' size='icon'>
              <MdEdit fontSize={24} />
            </Button>
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
