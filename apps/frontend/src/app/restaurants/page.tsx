import { restaurant } from '@/components/data';
import RestaurantCard from '@/components/RestaurantCard';
import Test from '@/components/test';
import { restaurantApi } from '@/network/api';

export default async function RestaurantsPage() {
  const { data: restaurants } = await restaurantApi.restaurantControllerFindAll();
  console.log(restaurant);
  return (
    <div className='container px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      <Test />
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
