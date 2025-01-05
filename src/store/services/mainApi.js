import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://' }),
  endpoints: (builder) => ({
    // findAll: builder.query({
    //   query: () => ({
    //     url: '/getProductsEnabled',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'GET',
    //   }),
    //   providesTags: [ { type: 'Product', id: 'LIST' } ],
    //   keepUnusedDataFor: 36,
    //   pollInterval: 36000,
    // }),
    // getProductById: builder.query({
    //   query: (id) => ({
    //     url: `/getProductsAdmin/${id}`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'GET',
    //   }),
    // }),
    
    // createNewOrder: builder.mutation({
    //   query: (body) =>  ({
    //     url: './createOrderAdmin',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //     body
    //   })
    // }),
    // createNewOrderBrowser: builder.mutation({
    //   query: (body) =>  ({
    //     url: './createOrderAdminBrowser',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'PUT',
    //     body
    //   })
    // }),
    
  }),
})

