import axios from 'axios';
import Cookies from 'js-cookie';

import { AdminCartApi, AdminFoodApi, AdminOrderApi, AdminRestaurantApi, AdminUserApi, CartApi, FoodApi, OrderApi, RestaurantApi, UserApi } from '@/api';

export const axs = axios.create();
export const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
export const adminUserApi = new AdminUserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);

export const restaurantApi = new RestaurantApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
export const adminRestaurantApi = new AdminRestaurantApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);

export const foodApi = new FoodApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
export const adminFoodApi = new AdminFoodApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);

export const cartApi = new CartApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
export const adminCartApi = new AdminCartApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);

export const orderApi = new OrderApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
export const adminOrderApi = new AdminOrderApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
