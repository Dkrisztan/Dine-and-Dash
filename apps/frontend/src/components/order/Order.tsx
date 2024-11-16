import { OrderDto } from '@/api';

export default function Order({ orders = [] }: { orders?: OrderDto[] }) {
  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>{order.id}</div>
      ))}
    </div>
  );
}
