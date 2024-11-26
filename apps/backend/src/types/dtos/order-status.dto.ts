export const OrderStatus: {
  [x: string]: 'PENDING' | 'ONGOING' | 'FINISHED' | 'CANCELLED' | 'DELIVERING';
} = {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED',
  DELIVERING: 'DELIVERING',
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
