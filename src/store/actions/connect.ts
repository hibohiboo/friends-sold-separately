import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { createPeerUser, getUsers, initGameObject, initLobby } from '@/domain/udonarium/room/lobby';
import { peerSlice } from '../slices/peer';
import { UserContext } from '@/domain/user/types';
import { PeerUser } from '@/domain/udonarium/class/peer-user';

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
  }
);
