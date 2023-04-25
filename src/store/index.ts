import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistMiddleWare } from '@/domain/user/repository';
import { api } from './query/api';
import { spreadsheetApi } from './query/spreadsheetApi';
import { attributesSlice } from './slices/attributes';
import { configSlice } from './slices/config';
import { favoritesSlice } from './slices/favorite';
import { gallerySlice } from './slices/gallery';
import { peerSlice } from './slices/peer';
import { udonariumLilySlice } from './slices/udonariumLily';
import { udonariumLilyChatSlice } from './slices/udonariumLilyChat';
import { udonariumRoomSlice } from './slices/udonariumRooms';
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
    gallery: gallerySlice.reducer,
    [spreadsheetApi.reducerPath]: spreadsheetApi.reducer,
    udonarium: udonariumLilySlice.reducer,
    udonariumLilyChat: udonariumLilyChatSlice.reducer,
    udonariumRoom: udonariumRoomSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([api.middleware, spreadsheetApi.middleware, persistMiddleWare]),
});
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
