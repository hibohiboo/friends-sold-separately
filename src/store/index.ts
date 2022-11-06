import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { peerSlice } from './slices/peer';
import { sampleSlice } from './slices/sample';

export const store = configureStore({
  reducer: {
    sample: sampleSlice.reducer,
    peer: peerSlice.reducer,
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
