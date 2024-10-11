import Image from 'next/image';

import { Badge } from '@/components/ui/badge';

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
  return (
    <div className='w-full max-w-xs mx-auto mb-10'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950'>
        <Image src='https://foodish-api.com/images/rice/rice34.jpg' width={400} height={400} alt='Picture of a restaurant' />
        <div className='p-4 space-y-2'>
          <h3 className='text-xl font-semibold'>Restaurant Title</h3>
          <p className='text-gray-500 dark:text-gray-400'>This is a description of the product.</p>
          <div className='flex items-center gap-2 flex-wrap pt-2'>
            {restaurant.tags.map((tag, index) => {
              return (
                <Badge key={index} variant={'secondary'}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
