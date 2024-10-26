import RestaurantCard from '@/components/restaurant/RestaurantCard';
import { restaurantApi } from '@/network/api';

export const dynamic = 'force-dynamic';

export default async function RestaurantsPage() {
  const { data: restaurants } = await restaurantApi.restaurantControllerFindAll();
  return (
    <div className='container px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      {restaurants.map((item, index) => {
        return (
          <div key={index}>
            <RestaurantCard restaurant={item} />
          </div>
        );
      })}
    </div>
  );
}
