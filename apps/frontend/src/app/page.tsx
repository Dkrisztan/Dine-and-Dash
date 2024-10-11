import { restaurant } from '@/components/data';
import RestaurantCard from '@/components/RestaurantCard';

export default function Home() {
  return (
    <div className='mt-10 flex flex-start flex-wrap sm:gap-4 md:gap-0'>
      {restaurant.map((item, index) => {
        return (
          <div key={index} className='md:w-1/5'>
            <RestaurantCard restaurant={item} />
          </div>
        );
      })}
    </div>
  );
}
