import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserContext } from '@/domain/user/types';
import { getUser } from '@/domain/udonarium/room/lobby';

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
    setUserName(state, action: PayloadAction<string>) {
      const user = getUser();
      if (!user || !state.self) return;
      user.name = action.payload;
      state.self.syncData.name = action.payload;
    },
  },
});
