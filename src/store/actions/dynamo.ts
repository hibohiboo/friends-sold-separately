import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoriteMessage } from '@/domain/favorite/api';
import { UUID } from '@/domain/udonarium/class/core/system/util/uuid';
import { getUsers, putUser } from '@/domain/user/api';
import { toPutUserContext } from '@/domain/user/converter';
import { RootState } from '..';
import { favoritesSlice } from '../slices/favorite';
import { userProfileSlice } from '../slices/userProfile';
import { usersSlice } from '../slices/users';

export const connectServer = createAsyncThunk<void, void, { state: RootState }>(
  'connectServer',
  async (req, thunkAPI) => {
    const users = await getUsers();

    thunkAPI.dispatch(usersSlice.actions.setUsersContext(users));
    const state = thunkAPI.getState();
    if (!state.userProfile.identifier) {
      const id = UUID.generateUuid();

      thunkAPI.dispatch(
        userProfileSlice.actions.setProfile({
          identifier: id,
          userId: id,
          peerId: '',
          name: 'ミエナイトモダチ',
          twitterId: '',
          isPublish: false,
          favoriteAttribute: [],
        })
      );
      console.log('ミエナイトモダチ');
      return;
    }

    const favorites = await getFavoriteMessage(state.userProfile.identifier);
    console.log('favorrite', favorites);
    thunkAPI.dispatch(favoritesSlice.actions.favoritesAdd(favorites));
  }
);

// Google Tag Manger 用グローバル変数
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const updateProfile = createAsyncThunk<void, void, { state: RootState }>(
  'updateProfile',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();

    await putUser(toPutUserContext(state));
    thunkAPI.dispatch(connectServer());

    // // GTMにイベントを送信
    // window.dataLayer.push({
    //   event: 'share',
    // });
  }
);

export const updateAttributes = createAsyncThunk<void, void, { state: RootState }>(
  'updateAttributes',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();
    console.error('未実装 update attributes');
  }
);
