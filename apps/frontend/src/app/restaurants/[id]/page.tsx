import FoodCard from '@/components/food/FoodCard';
import { Param } from '@/lib/param';
import { foodApi } from '@/network/api';

export const dynamic = 'force-dynamic';

export default async function RestaurantPage(props: Param) {
  const { id } = props.params;

  const { data: foods } = await foodApi.foodControllerFindAllForRestaurant(id);

  return (
    <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      {foods.map((item, index) => {
        return (
          <div key={index} className='container mx-auto py-3'>
            <FoodCard food={item} />
          </div>
        );
      })}
    </div>
  );
}
