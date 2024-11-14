import axios from 'axios';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

import { UserApi } from '@/api';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImageUploader: f({ image: { maxFileSize: '16MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const authAxios = axios.create();
      authAxios.interceptors.request.use((config) => {
        const token = req.cookies.get('accessToken')?.value;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
      const { data: user } = await userApi.userControllerMe();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, token: req.cookies.get('accessToken')?.value };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log('Upload complete for userId:', metadata.userId);
      // console.log('file url', file.url);

      const authAxios = axios.create();
      authAxios.interceptors.request.use((config) => {
        const token = metadata.token;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      const userApi = new UserApi(undefined, process.env.NEXT_PUBLIC_API_URL, authAxios);
      await userApi.userControllerUpdateProfile({ image: file.url });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
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
