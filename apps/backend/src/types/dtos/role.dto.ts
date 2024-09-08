export const Role: {
  [x: string]: 'ADMIN' | 'CUSTOMER' | 'COURIER' | 'OWNER';
} = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
  COURIER: 'COURIER',
  OWNER: 'OWNER',
};

export type Role = (typeof Role)[keyof typeof Role];
