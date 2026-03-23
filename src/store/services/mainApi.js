import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env ? import.meta.env.VITE_API_URL : process.env.REACT_APP_API_URL;

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, // Ваш базовый URL
    prepareHeaders: (headers) => {
      // Извлекаем токен из кук при каждом запросе
      const token = Cookies.get('token');

      // Если токен есть, добавляем его в заголовки
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Product', 'User'], // Типы тегов для автоматического обновления данных
  endpoints: (builder) => ({
    // Пример запроса для получения данных пользователя (наш /me)
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    discordLogin: builder.query({
      query: (code) => `/auth/discord/callback?code=${code}`,
    }),

    getUserProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),


    //Global
    getTotalMinutes: builder.query({
      query: (code) => `/global/getTotalMinutes`,
    }),
    getTotalUsersCount: builder.query({
      query: (code) => `/global/getTotalUsersCount`,
    }),
    getTotalAchievements: builder.query({
      query: (code) => `/global/getTotalAchievements`,
    }),
    getAllAchievements: builder.query({
      query: (code) => `/global/getAllAchievements`,
    }),
    getTotalOnline: builder.query({
      query: (code) => `/global/getTotalOnline`,
    }),
    getUserById: builder.query({
      query: (user_id) => `/users/getUserById?user_id=${user_id}`,
    }),
    getAllUsers: builder.query({
      query: (limit) => `/users/getAllUsers?limit=${limit}`,
    }),
    getTreeData: builder.query({
      query: () => `/global/getTreeData`,
    }),
    
  }),
});

// Экспортируем хуки, которые генерируются автоматически
export const { 
  useGetMeQuery, 
} = mainApi;