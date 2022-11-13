import { createAsyncThunk } from '@reduxjs/toolkit';
import { UUID } from '@/domain/udonarium/class/core/system/util/uuid';
import { getUser } from '@/domain/udonarium/room/lobby';
import { getUsers, putUser } from '@/domain/user/api';
import { toPutUserContext } from '@/domain/user/converter';
import { RootState } from '..';
import { userProfileSlice } from '../slices/userProfile';
import { usersSlice } from '../slices/users';

export const connectServer = createAsyncThunk<void, void, { state: RootState }>(
  'connectServer',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();
    if (!state.userProfile.identifier) {
      const id = UUID.generateUuid();
      console.log('new id', id);
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
    }
    const users = await getUsers();

    thunkAPI.dispatch(usersSlice.actions.setUsersContext(users));
  }
);

export const updateProfile = createAsyncThunk<void, void, { state: RootState }>(
  'updateProfile',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();
    // udonarium
    // const user = getUser();
    // const profile = state.userProfile;
    // user.name = profile.name;
    // user.isPublish = profile.isPublish;
    // user.twitterId = profile.twitterId;

    await putUser(toPutUserContext(state));
  }
);

export const updateAttributes = createAsyncThunk<void, void, { state: RootState }>(
  'updateAttributes',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = getUser();
    const attributes = Object.values(state.attributes.entities);
    user.attributes = attributes.flatMap((attr) => (attr ? [attr] : []));
  }
);
