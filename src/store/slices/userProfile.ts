import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFavorite, UserContext } from '@/domain/user/types';

export interface UserProfileState {
  identifier: string;
  userId: string;
  peerId: string;
  name: string;
  isPublish: boolean;
  favoriteAttribute: MyFavorite[];
}

const initialState: UserProfileState = {
  identifier: '',
  userId: '',
  peerId: '',
  name: '',
  isPublish: false,
  favoriteAttribute: [],
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
      state.isPublish = syncData.isPublish;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    toggleIsPublish(state) {
      state.isPublish = !state.isPublish;
    },
    userReceived(state, action) {
      return { ...action.payload };
    },
    addFavorite(state, action: PayloadAction<MyFavorite>) {
      state.favoriteAttribute.push(action.payload);
    },
  },
});
