import { useRouter } from 'next/navigation';

import { FoodDto, OrderDto, OrderItemDto, RestaurantDto } from '@/api';

interface ExtendedOrderDto extends OrderItemDto {
  food?: FoodDto;
}

interface OrderProps extends OrderDto {
  items?: ExtendedOrderDto[];
  restaurant?: RestaurantDto;
}

export default function OrderCard({ order, foodMap }: { order: OrderProps; foodMap: Record<string, Record<string, number>> }) {
  const router = useRouter();

  return (
    <div
      key={order.id}
      className='p-6 rounded-xl border hover:shadow-lg cursor-pointer'
      onClick={() => {
        router.push(`/owner/restaurant/orders/${order.id}`);
      }}
    >
      <div className='text-xl flex flex-row justify-between'>
        <div>{order.restaurant?.name}</div>
        <div className='pl-80'>
          {new Date(order.createdAt)
            .toLocaleString('en-CA', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
            .replace(',', '')}
        </div>
      </div>
      <div className='text-lg'>
        <div className='flex flex-col'>
          {Object.keys(foodMap[order.id]).map((foodType) => (
            <div key={foodType} className='flex flex-row gap-4'>
              <div>{foodType}</div>
              <div>x{foodMap[order.id][foodType]}</div>
            </div>
          ))}
          <div className='flex flex-row justify-between pr-8 gap-2'>
            <div className='flex flex-row gap-2'>
              <div>Total:</div>
              {order.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
