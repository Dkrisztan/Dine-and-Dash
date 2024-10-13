import { restaurant } from '@/components/data';
import RestaurantCard from '@/components/RestaurantCard';
import Test from '@/components/test';
import { restaurantApi } from '@/network/api.service';

export default async function Home() {
  const restaurants = await restaurantApi.restaurantControllerFindAll();
  console.log(restaurants.data);
  return (
    <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      <Test />
      {restaurant.map((item, index) => {
        return (
          <div key={index}>
            <RestaurantCard restaurant={item} />
          </div>
        );
      })}
    </div>
  );
}
