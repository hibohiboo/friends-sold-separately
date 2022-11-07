import { createAsyncThunk } from '@reduxjs/toolkit';
import { PeerUser } from '@/domain/udonarium/class/peer-user';
import {
  createPeerUser,
  getUser,
  getUsers,
  initGameObject,
  initLobby,
} from '@/domain/udonarium/room/lobby';
import { UserContext } from '@/domain/user/types';
import { RootState } from '..';
import { peerSlice } from '../slices/peer';
import { userProfileSlice } from '../slices/userProfile';

const peerToContext = (u: PeerUser) => u.toContext() as UserContext;
export const connect = createAsyncThunk<void, void, { state: RootState }>(
  'connect',
  async (req, thunkAPI) => {
    const updateGameObjectHandler = () => {
      const users = getUsers();
      const userContexts = users.map(peerToContext);
      thunkAPI.dispatch(peerSlice.actions.setPeers(userContexts));
    };
    initGameObject();
    const user = createPeerUser(updateGameObjectHandler);
    await initLobby((ev) => {
      console.log('lobby initialized', ev);
    });
    const userContext = peerToContext(user);
    thunkAPI.dispatch(peerSlice.actions.setUser(userContext));
    thunkAPI.dispatch(userProfileSlice.actions.setUser(userContext));
  }
);

export const updateProfile = createAsyncThunk<void, void, { state: RootState }>(
  'updateProfile',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = getUser();
    const profile = state.userProfile;
    user.name = profile.name;
    user.isPublish = profile.isPublish;
    user.twitterId = profile.twitterId;
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
