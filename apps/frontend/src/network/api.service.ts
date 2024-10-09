import axios from 'axios';

import { UserApi } from '@/api';

export const axs = axios.create();

export const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, axs);
