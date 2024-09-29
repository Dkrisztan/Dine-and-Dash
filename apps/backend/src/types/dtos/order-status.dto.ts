export const OrderStatus: {
  [x: string]: 'PENDING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';
} = {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED',
};

export type Role = (typeof OrderStatus)[keyof typeof OrderStatus];
