import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Ratings from '@/components/ui/ratings';

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string;
  addresses: string[];
  rating: number[];
  image: string;
  ownerId: string;
  tags: string[];
}

export default function RestaurantCard({ restaurant }: { restaurant: RestaurantCardProps }) {
  const rating = restaurant.rating.reduce((a, b) => a + b, 0) / restaurant.rating.length;

  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className='container mx-auto py-3 transition-transform duration-300 ease-in-out hover:scale-105'>
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
    </Link>
  );
}
