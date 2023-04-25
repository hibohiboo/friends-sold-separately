import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '@/domain/udonarium/types';

export const udonariumRoomAdapter = createEntityAdapter<Room>({
  selectId: (attr) => attr.alias,
});

export const udonariumRoomSlice = createSlice({
  name: 'udonariumRoom',
  initialState: udonariumRoomAdapter.getInitialState<{ selectedId?: string }>({}),
  reducers: {
    chatAdd(state, action: PayloadAction<Room[]>) {
      udonariumRoomAdapter.upsertMany(state, action.payload);
    },
  },
});
