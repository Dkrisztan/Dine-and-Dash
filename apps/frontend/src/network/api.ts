import axios from 'axios';
import Cookies from 'js-cookie';

import { FoodApi, RestaurantApi, UserApi } from '@/api';

export const axs = axios.create();
export const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
export const restaurantApi = new RestaurantApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
export const foodApi = new FoodApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
