'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { MdAttachMoney } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function FoodCard({ food }: { food: FoodCardProps }) {
  const [quantity, setQuantity] = useState(0);

  const addFood = () => {
    setQuantity((prev) => prev + 1);
  };

  const removeFood = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

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
          <div className='flex flex-row justify-center items-center gap-2'>
            <Button variant='link' size='icon' className='rounded-full' onClick={removeFood}>
              <LuMinusCircle className='text-xl transition-transform duration-300 ease-in-out hover:scale-110' />
            </Button>
            <span className='w-4 text-center'>{quantity}</span>
            <Button variant='link' size='icon' className='rounded-full' onClick={addFood}>
              <LuPlusCircle className='text-xl transition-transform duration-300 ease-in-out hover:scale-110' />
            </Button>
          </div>
        </CardFooter>
        {quantity !== 0 && (
          <Button className='w-full' variant='outline'>
            Add to cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
