import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserContext } from '@/domain/user/types';

// コンパイラが ts4023のエラーを const store = configureStore で出すので解決のためにexport
export interface PeerState {
  self?: UserContext;
  isReady: boolean;
  list: UserContext[];
}

const initialState: PeerState = {
  self: undefined,
  isReady: false,
  list: [],
};

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserContext>) {
      state.self = action.payload;
    },
    setPeers(state, action: PayloadAction<UserContext[]>) {
      state.list = action.payload;
    },
  },
});
