import { restaurant } from '@/components/data';
import RestaurantCard from '@/components/RestaurantCard';
import Test from '@/components/test';
import { userApi } from '@/network/api.service';

export default async function Home() {
  const user = await userApi.userControllerMe();
  return (
    <div className='px-8 mt-10 grid md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-6'>
      <Test />
      {/*<p>{user.data.name}</p>*/}
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
