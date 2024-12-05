import { useMemo } from 'react';

import { FoodDto, OrderDto, OrderItemDto, RestaurantDto } from '@/api';

interface ExtendedOrderDto extends OrderItemDto {
  food?: FoodDto;
}

interface OrderProps extends OrderDto {
  items?: ExtendedOrderDto[];
  restaurant?: RestaurantDto;
}

export default function FinishedOrders({ orders = [] }: { orders?: OrderProps[] }) {
  const orderFoodMap = useMemo(() => {
    const map: Record<string, Record<string, number>> = {};
    orders.forEach((order) => {
      const foodQuantity: Record<string, number> = {};
      order.items?.forEach((item) => {
        const foodType = item.food?.name;
        if (foodType) {
          foodQuantity[foodType] = (foodQuantity[foodType] || 0) + 1;
        }
      });
      map[order.id] = foodQuantity;
    });
    return map;
  }, [orders]);

  return (
    <div className='mx-32'>
      <div>
        {orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order) => {
            // eslint-disable-next-line react/jsx-key
            return (
              <div key={order.id} className='p-6 rounded-xl border'>
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
                    {Object.keys(orderFoodMap[order.id]).map((foodType) => (
                      <div key={foodType} className='flex flex-row gap-4'>
                        <div>{foodType}</div>
                        <div>x{orderFoodMap[order.id][foodType]}</div>
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
          })}
      </div>
    </div>
  );
}
