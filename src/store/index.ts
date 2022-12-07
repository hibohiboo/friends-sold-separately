import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistMiddleWare } from '@/domain/user/repository';
import { api } from './query/api';
import { attributesSlice } from './slices/attributes';
import { configSlice } from './slices/config';
import { favoritesSlice } from './slices/favorite';
import { peerSlice } from './slices/peer';
import { userProfileSlice } from './slices/userProfile';
import { usersSlice } from './slices/users';

export const store = configureStore({
  reducer: {
    peer: peerSlice.reducer,
    userProfile: userProfileSlice.reducer,
    attributes: attributesSlice.reducer,
    favorites: favoritesSlice.reducer,
    users: usersSlice.reducer,
    [api.reducerPath]: api.reducer,
    config: configSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, persistMiddleWare]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
