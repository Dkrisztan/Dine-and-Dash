import RestaurantCard from '@/components/RestaurantCard';
import Test from '@/components/test';
import { restaurantApi } from '@/network/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { data: restaurants } = await restaurantApi.restaurantControllerFindAll();
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-bold mt-10'>Restaurants</h1>
      <Test />
      <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-7'>
        {restaurants.map((item, index) => {
          return (
            <div key={index}>
              <RestaurantCard restaurant={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
