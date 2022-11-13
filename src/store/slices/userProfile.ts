import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFavorite, PutUserContext, UserContext } from '@/domain/user/types';

export interface UserProfileState {
  identifier: string;
  userId: string;
  peerId: string;
  name: string;
  twitterId: string;
  isPublish: boolean;
  favoriteAttribute: MyFavorite[];
}

const initialState: UserProfileState = {
  identifier: '',
  userId: '',
  peerId: '',
  name: '',
  twitterId: '',
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
      state.twitterId = syncData.twitterId;
    },
    setPutUserContext(state, action: PayloadAction<PutUserContext>) {
      const { profile } = action.payload;
      state.identifier = profile.userId;
      state.name = profile.name;
      state.userId = profile.userId;
      state.isPublish = profile.isPublish;
      state.twitterId = profile.twitterId;
    },
    setProfile(state, action: PayloadAction<UserProfileState>) {
      state.identifier = action.payload.identifier;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.isPublish = action.payload.isPublish;
      state.twitterId = action.payload.twitterId;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setTwitterId(state, action: PayloadAction<string>) {
      state.twitterId = action.payload;
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
