import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://213.159.214.219:4000/api', // Ваш базовый URL
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
    getTotalOnline: builder.query({
      query: (code) => `/global/getTotalOnline`,
    }),
    getUserWithAchievements: builder.query({
      query: (user_id) => `/users/getUserWithAchievements?user_id=${user_id}`,
    }),
  }),
});

// Экспортируем хуки, которые генерируются автоматически
export const { 
  useGetMeQuery, 
} = mainApi;