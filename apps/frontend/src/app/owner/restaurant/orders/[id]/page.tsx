'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { OrderDtoStatusEnum } from '@/api';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMyRestaurantOrders } from '@/hooks/restaurant/useMyRestaurantOrders';
import { useUpdateMyRestaurantOrders } from '@/hooks/restaurant/useUpdateMyRestaurantOrders';
import { Param } from '@/lib/param';

export default function RestaurantOrderPage(props: Param) {
  const { id } = props.params;
  const getOrders = useMyRestaurantOrders();
  const updateRestaurantOrder = useUpdateMyRestaurantOrders(id);
  const [updateStatus, setUpdateStatus] = useState({
    status: getOrders.data?.find((order) => order.id === id)?.status || OrderDtoStatusEnum.Pending,
  });

  const order = getOrders.data?.find((order) => order.id === id);

  if (!order) {
    return <div>No deliveries available at the moment</div>;
  }

  const handleSaveChanges = async () => {
    try {
      await updateRestaurantOrder.trigger({
        status: updateStatus.status,
      });
      toast.success('Order status updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update order status.');
    }
  };

  return (
    <div className='mx-auto flex flex-row justify-center items-center gap-2'>
      <Label htmlFor='status' className='text-lg font-bold'>
        <div className='flex flex-row items-center'>Status of the order:</div>
      </Label>
      <Select
        defaultValue={order.status}
        onValueChange={(value) =>
          setUpdateStatus((prev) => ({
            ...prev,
            status: value as OrderDtoStatusEnum,
          }))
        }
      >
        <SelectTrigger className='w-32'>
          <SelectValue placeholder={order.status} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(OrderDtoStatusEnum).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant='outline' onClick={handleSaveChanges}>
        {updateRestaurantOrder.isMutating ? <Spinner /> : 'Save Changes'}
      </Button>
    </div>
  );
}
