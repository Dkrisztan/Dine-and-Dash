'use client';

import RestaurantCard from '@/components/restaurant/RestaurantCard';
import RestaurantSkeletonCard from '@/components/restaurant/RestaurantSkeletonCard';
import { useRestaurant } from '@/hooks/restaurant/useRestaurant';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const { data: restaurants, isLoading } = useRestaurant();

  return (
    <div className='flex flex-col'>
      <h1 className='text-center text-4xl font-bold mt-10'>Restaurants</h1>
      <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-7'>
        {isLoading ? (
          <>
            <RestaurantSkeletonCard />
            <RestaurantSkeletonCard />
            <RestaurantSkeletonCard />
            <RestaurantSkeletonCard />
          </>
        ) : (
          restaurants?.map((item, index) => {
            return (
              <div key={index}>
                <RestaurantCard restaurant={item} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
