import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { peerSlice } from './slices/peer';
import { userProfileSlice } from './slices/userProfile';

export const store = configureStore({
  reducer: {
    peer: peerSlice.reducer,
    userProfile: userProfileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
