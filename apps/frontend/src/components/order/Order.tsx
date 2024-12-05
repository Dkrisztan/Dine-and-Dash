import { useMemo, useState } from 'react';

import { FoodDto, OrderDto, OrderItemDto, RestaurantDto, UserDto } from '@/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Ratings from '@/components/ui/ratings';
import { useRateRestaurant } from '@/hooks/restaurant/useRateRestaurant';

interface ExtendedOrderDto extends OrderItemDto {
  food?: FoodDto;
}

interface OrderProps extends OrderDto {
  items?: ExtendedOrderDto[];
  restaurant?: RestaurantDto;
}

export default function Order({ orders = [], user, refreshOrders, refreshUser }: { orders?: OrderProps[]; user: UserDto; refreshOrders: () => void; refreshUser: () => void }) {
  const [rateStars, setRateStars] = useState(0);
  const rate = useRateRestaurant();

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
      <Accordion type='single' collapsible>
        {orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order) => {
            const hasRated = Boolean(user.ratings.find((rating) => rating.restaurantId === order.restaurant?.id));

            return (
              <AccordionItem key={order.id} value={order.id}>
                <AccordionTrigger className='text-xl flex flex-row justify-between'>
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
                </AccordionTrigger>
                <AccordionContent className='text-lg'>
                  <div className='flex flex-col'>
                    {Object.keys(orderFoodMap[order.id]).map((foodType) => (
                      <div key={foodType} className='flex flex-row gap-4'>
                        <div>{foodType}</div>
                        <div>x{orderFoodMap[order.id][foodType]}</div>
                      </div>
                    ))}
                    <div className='flex flex-row justify-between pr-8 gap-2'>
                      <div className='flex flex-row gap-2 items-center justify-center'>
                        <Ratings
                          value={hasRated ? user.ratings.find((rating) => rating.restaurantId === order.restaurant?.id)?.score || 0 : rateStars}
                          variant='yellow'
                          asInput={!hasRated}
                          onValueChange={(value) => {
                            if (!hasRated) setRateStars(value);
                          }}
                        />
                        <Button
                          variant='outline'
                          disabled={hasRated || rateStars === 0}
                          onClick={async () => {
                            if (!order.restaurant) return;
                            await rate.trigger({
                              restaurantId: order.restaurant.id,
                              score: rateStars,
                            });
                            await refreshUser();
                            await refreshOrders();
                          }}
                        >
                          {hasRated ? 'Already Rated' : 'Rate'}
                        </Button>
                      </div>
                      <div className='flex flex-row gap-2'>
                        <div>Total:</div>
                        {order.total}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}
