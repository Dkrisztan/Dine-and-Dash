import { useMemo } from 'react';

import { FoodDto, OrderDto, OrderItemDto, RestaurantDto } from '@/api';
import OrderCard from '@/components/order-card/OrderCard';

interface ExtendedOrderDto extends OrderItemDto {
  food?: FoodDto;
}

interface OrderProps extends OrderDto {
  items?: ExtendedOrderDto[];
  restaurant?: RestaurantDto;
}

export default function IncomingOrders({ orders = [] }: { orders?: OrderProps[] }) {
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
            return <OrderCard order={order} foodMap={orderFoodMap} />;
          })}
      </div>
    </div>
  );
}
