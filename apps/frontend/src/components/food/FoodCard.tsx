'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu';
import { MdAttachMoney } from 'react-icons/md';
import { toast } from 'sonner';

import { AddToCartDto, FoodDto } from '@/api';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddToCart } from '@/hooks/cart/useAddToCart';

export default function FoodCard({ food }: { food: FoodDto }) {
  const [quantity, setQuantity] = useState(0);
  const [cartItem, setCartItem] = useState<AddToCartDto>({ foodId: food.id, quantity: 0 });
  const addToCart = useAddToCart();

  const addFood = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setCartItem((prevCartItem) => ({
        ...prevCartItem,
        quantity: newQuantity,
      }));
      return newQuantity;
    });
  };

  const removeFood = () => {
    if (quantity === 0) return;
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      setCartItem((prevCartItem) => ({
        ...prevCartItem,
        quantity: newQuantity,
      }));
      return newQuantity;
    });
  };

  if (addToCart.error) {
    toast.error('You need to be logged in to add items to the cart!');
  }

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
          <div className='flex flex-row justify-center items-center gap-2 rounded-3xl bg-atcb'>
            <Button variant='link' size='icon' className='rounded-full' onClick={removeFood}>
              <LuMinusCircle className='text-xl transition-transform duration-300 ease-in-out hover:scale-110' />
            </Button>
            <span className='w-4 text-center'>{quantity}</span>
            <Button variant='link' size='icon' className='rounded-full' onClick={addFood}>
              <LuPlusCircle className='text-xl transition-transform duration-300 ease-in-out hover:scale-110' />
            </Button>
          </div>
        </CardFooter>
        <div className='flex flex-col items-end mt-2'>
          {quantity !== 0 && (
            <Button
              onClick={async () => {
                await addToCart.trigger(cartItem);
                toast.success(`${food.name} has been added to the cart!`);
                setQuantity(0);
              }}
              variant='outline'
              className='self-end w-1/3 relative overflow-hidden transition-all
                before:absolute before:bottom-0 before:left-0 before:top-0
                before:z-0 before:h-full before:w-0 before:bg-green-700 before:transition-all
                before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full'
            >
              {addToCart.isMutating ? <Spinner className='text-white' /> : <span className='relative z-10'>Add to cart</span>}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
