import { createAsyncThunk } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '@/domain/udonarium/post';
import { PeerRoom } from '@/domain/udonarium/types';
import { RootState } from '..';
import { udonariumLilySlice } from '../slices/udonariumLily';
import { udonariumRoomSlice } from '../slices/udonariumRooms';

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
    if (text === '') {
      return;
    }
    const chatMessage = {
      from: state.userId,
      name: state.playerName,
      timestamp: Date.now(),
      text,
    };
    thunkAPI.dispatch(udonariumLilySlice.actions.setChatText(''));
    postUdonariumMessage(chatMessage, 'send-chat-message');
  }
);
export const loadedUdonariumRooms = createAsyncThunk<void, PeerRoom[], { state: RootState }>(
  'loadedUdonariumRooms',
  async (req, thunkAPI) => {
    thunkAPI.dispatch(
      udonariumRoomSlice.actions.chatAdd(
        req.flatMap((room) => {
          const [firstUser] = room.peerContexts;
          if (!firstUser) return []; // 空配列を返すとflatMapでfilterと同様の挙動になる

          return [
            {
              hasPassword: !!firstUser.digestPassword,
              name: room.roomName,
              numberOfEntrants: room.peerContexts.length,
              alias: room.alias, // `${roomId}${roomName}`
            },
          ];
        })
      )
    );
  }
);
export const connectUdonariumByRoom = createAsyncThunk<
  void,
  { alias: string; pass: string },
  { state: RootState }
>('connectUdonariumByRoom', async (req, thunkAPI) => {
  postUdonariumMessage(req, 'connect-by-room-alias');
});
