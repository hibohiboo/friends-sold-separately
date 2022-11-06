import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistMiddleWare } from '@/domain/user/repository';
import { attributesSlice } from './slices/attributes';
import { peerSlice } from './slices/peer';
import { userProfileSlice } from './slices/userProfile';

export const store = configureStore({
  reducer: {
    peer: peerSlice.reducer,
    userProfile: userProfileSlice.reducer,
    attributes: attributesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleWare),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
