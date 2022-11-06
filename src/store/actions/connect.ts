import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { createPeerUser, getUsers, initGameObject, initLobby } from '@/domain/udonarium/room/lobby';
import { peerSlice } from '../slices/peer';
import { UserContext } from '@/domain/user/types';

export const connect = createAsyncThunk<void, void, { state: RootState }>(
  'connect',
  async (req, thunkAPI) => {
    let users: any[] = [];
    const updateGameObjectHandler = () => {
      users = getUsers();
    };
    initGameObject();
    const user = createPeerUser(updateGameObjectHandler);
    await initLobby((ev) => {
      console.log('test', ev);
      console.log(users);
    });
    const userContext = user.toContext() as UserContext;
    thunkAPI.dispatch(peerSlice.actions.setUser(userContext));
  }
);
