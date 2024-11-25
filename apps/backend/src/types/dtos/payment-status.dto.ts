export const PaymentStatus: {
  [x: string]: 'PENDING' | 'PAID' | 'FAILED';
} = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
