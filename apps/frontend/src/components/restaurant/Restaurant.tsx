import Image from 'next/image';
import { FaPlus } from 'react-icons/fa';

import { UserDto } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Ratings from '@/components/ui/ratings';

export default function Restaurant({ user }: { user: UserDto }) {
  const restaurant = user.ownerOf;
  const rating = restaurant?.rating && restaurant?.rating.length > 0 ? restaurant.rating.reduce((a, b) => a + b, 0) / restaurant.rating.length : 0;

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      {restaurant ? (
        <div className='container mx-auto py-3'>
          <Card>
            <CardHeader className='p-0 mb-2'>
              <Image src={restaurant.image} width={400} height={400} alt='Picture of a restaurant' className='rounded-t-xl w-full h-auto object-cover aspect-video' />
            </CardHeader>
            <CardContent>
              <CardTitle className='text-2xl font-semibold'>{restaurant.name}</CardTitle>
              <p className='text-gray-500 dark:text-gray-400'>{restaurant.description}</p>
              <div className='flex items-center gap-2 flex-wrap pt-2'>
                {restaurant.tags.map((tag, index) => {
                  return (
                    <Badge key={index} variant={'secondary'}>
                      {tag}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className='pb-3'>
              <Ratings value={rating} size={15} variant='yellow' />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <>
          <span className='text-2xl font-bold'>You don&apos;t have a restaurant yet.</span>
          <Button variant='outline' className='w-1/2 gap-2'>
            <FaPlus />
            Create Restaurant
          </Button>
        </>
      )}
    </div>
  );
}
