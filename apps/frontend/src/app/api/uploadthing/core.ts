import axios from 'axios';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { UserApi } from '@/api';

const f = createUploadthing();

export const ourFileRouter = {
  profileImageUploader: f({ image: { maxFileSize: '16MB' } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),

  restaurantImageUploader: f({ image: { maxFileSize: '16MB' } })
    .middleware(async ({ req }) => {
      const authAxios = axios.create();
      authAxios.interceptors.request.use((config) => {
        const token = req.cookies.get('accessToken')?.value;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
      const { data: user } = await userApi.userControllerMe();

      if (!user) throw new UploadThingError('Unauthorized');

      return { userId: user.id, token: req.cookies.get('accessToken')?.value };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const authAxios = axios.create();
      authAxios.interceptors.request.use((config) => {
        const token = metadata.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
      await userApi.userControllerUpdateProfile({ image: file.url });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
