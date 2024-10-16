import axios from 'axios';

import { FoodApi, RestaurantApi, UserApi } from '@/api';

export const axs = axios.create();
export const authAxios = axios.create();

export const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
export const restaurantApi = new RestaurantApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
export const foodApi = new FoodApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
