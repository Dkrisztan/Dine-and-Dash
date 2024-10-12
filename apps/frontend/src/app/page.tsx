import { restaurant } from '@/components/data';
import RestaurantCard from '@/components/RestaurantCard';

export default function Home() {
  return (
    <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
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
