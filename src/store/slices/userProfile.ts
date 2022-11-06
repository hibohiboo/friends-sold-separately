import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserContext } from '@/domain/user/types';

export interface UserProfileState {
  identifier: string;
  userId: string;
  peerId: string;
  name: string;
}

const initialState: UserProfileState = {
  identifier: '',
  userId: '',
  peerId: '',
  name: '',
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserContext>) {
      state.identifier = action.payload.identifier;
      const { syncData } = action.payload;
      state.name = syncData.name;
      state.userId = syncData.userId;
      state.peerId = syncData.peerId;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});
