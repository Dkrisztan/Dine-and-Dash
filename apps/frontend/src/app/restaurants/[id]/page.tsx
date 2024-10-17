import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Param } from '@/lib/param';
import { foodApi } from '@/network/api';

export default async function RestaurantPage({ params: { id } }: Param) {
  //const { data: restaurant } = await restaurantApi.restaurantControllerFindOne(id);
  const { data: foods } = await foodApi.foodControllerFindAllForRestaurant(id);

  return (
    <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      {foods.map((item, index) => {
        return (
          <div key={index} className='container mx-auto py-3 transition-transform duration-300 ease-in-out hover:scale-105'>
            <Card>
              <CardHeader className='p-0 mb-2'>
                <Image src={item.image} width={400} height={400} alt='Picture of a food' className='rounded-t-xl w-full h-auto object-cover aspect-video' />
              </CardHeader>
              <CardContent>
                <CardTitle className='text-2xl font-semibold'>{item.name}</CardTitle>
                <p className='text-gray-500 dark:text-gray-400'>{item.description}</p>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
