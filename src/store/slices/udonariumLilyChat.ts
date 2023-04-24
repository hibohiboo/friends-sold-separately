import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/domain/udonarium/types';

export const udonariumLilyChatAdapter = createEntityAdapter<ChatMessage>({
  selectId: (attr) => attr.id,
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

export const udonariumLilyChatSlice = createSlice({
  name: 'udonariumLilyChat',
  initialState: udonariumLilyChatAdapter.getInitialState<{ selectedId?: string }>({}),
  reducers: {
    chatAdd(state, action: PayloadAction<ChatMessage>) {
      udonariumLilyChatAdapter.upsertOne(state, action.payload);
    },
  },
});
