import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_PATH } from '@/domain/http/constants';
import { GYUTTO_HAND_USER_PATH } from '@/domain/user/constants';
import { DynamoResponseUser, PutUserContext } from '@/domain/user/types';

export const api = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_PATH }),
  endpoints: (builder) => ({
    getUserById: builder.query<PutUserContext, string>({
      query: (id) => `${GYUTTO_HAND_USER_PATH}/${id}`,
      transformResponse: (response: DynamoResponseUser) => {
        try {
          return JSON.parse(response.Item.json.S);
        } catch (e) {
          console.warn(e);
          console.warn('response', response?.Item?.json?.S);
          throw e;
        }
      },
    }),
  }),
});

export const { useGetUserByIdQuery } = api;
