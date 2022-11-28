import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_PATH } from '@/domain/http/constants';
import { GYUTTO_HAND_USER_PATH } from '@/domain/user/constants';
import { DynamoResponseUser } from '@/domain/user/types';

export const api = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_PATH }),
  endpoints: (builder) => ({
    getUserById: builder.query<DynamoResponseUser, string>({
      query: (id) => `${GYUTTO_HAND_USER_PATH}/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = api;
