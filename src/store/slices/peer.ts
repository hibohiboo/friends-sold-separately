import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserContext } from '@/domain/user/types';

// コンパイラが ts4023のエラーを const store = configureStore で出すので解決のためにexport
export interface PeerState {
  self?: UserContext;
  isReady: boolean;
}

const initialState: PeerState = {
  self: undefined,
  isReady: false,
};

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserContext>) {
      state.self = action.payload;
    },
  },
});
