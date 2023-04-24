import { createAsyncThunk } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '@/domain/udonarium/post';
import { RootState } from '..';
import { udonariumLilySlice } from '../slices/udonariumLily';

export const connectUdonariumByTargetUserId = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>('connectUdonariumByTargetUserId', async (req, thunkAPI) => {
  postUdonariumMessage(thunkAPI.getState().udonarium.targetUserId, 'connect-by-target-user-id');
});

export const sendUdonariumChatMessage = createAsyncThunk<void, undefined, { state: RootState }>(
  'sendUdonariumChatMessage',
  async (req, thunkAPI) => {
    const state = thunkAPI.getState().udonarium;
    const text = state.chatText;
    if (text === '') return;
    const chatMessage = {
      from: state.userId,
      name: state.playerName,
      timestamp: Date.now(),
      text,
    };
    postUdonariumMessage(chatMessage, 'send-chat-message');
    thunkAPI.dispatch(udonariumLilySlice.actions.setChatText(''));
  }
);
