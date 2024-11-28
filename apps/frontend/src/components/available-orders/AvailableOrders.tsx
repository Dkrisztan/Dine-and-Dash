import { useMemo } from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import { RiArrowRightSFill } from 'react-icons/ri';

import { FoodDto, OrderDto, OrderItemDto, RestaurantDto } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAcceptOrder } from '@/hooks/courier/useAcceptOrder';

interface ExtendedOrderDto extends OrderItemDto {
  food?: FoodDto;
}

interface OrderProps extends OrderDto {
  items?: ExtendedOrderDto[];
  restaurant?: RestaurantDto;
}

export default function AvailableOrders({ orders = [], refresh }: { orders?: OrderProps[]; refresh: () => void }) {
  const acceptOrder = useAcceptOrder();

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
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='container py-3 px-36 flex flex-col gap-4'>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className='text-xl font-semibold'>Order ID: {order.id}</CardHeader>
            <CardContent className='bg-gray-300 bg-opacity-10 border-b-1 border-t-1'>
              <CardTitle className='text-2xl font-semibold py-5'>{order.restaurant?.name}</CardTitle>
              {Object.keys(orderFoodMap[order.id]).map((foodType) => (
                <div key={foodType} className='flex flex-row gap-4'>
                  <div>{foodType}</div>
                  <div>x{orderFoodMap[order.id][foodType]}</div>
                </div>
              ))}
              <div className='text-lg pt-5 font-bold'>Total: {order.total}</div>
            </CardContent>
            <CardFooter className='py-3 flex flex-row justify-between'>
              <div className='flex flex-row items-center justify-center text-emerald-600'>
                Delivery address: {order.restaurant?.addresses.at(0)} <RiArrowRightSFill size={24} /> {order.deliveryTo}
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='transition-transform duration-300 ease-in-out hover:scale-110'
                onClick={async () => {
                  await acceptOrder.trigger({ orderId: order.id });
                  refresh();
                }}
              >
                <FaSquareCheck size={24} color={'green'} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
