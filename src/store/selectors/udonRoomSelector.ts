import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { udonariumRoomAdapter } from '../slices/udonariumRooms';

const chatSelector = (state: RootState) => state.udonariumRoom;
const adapterSelectors = udonariumRoomAdapter.getSelectors();

export const udonariumRoomSelector = createSelector(chatSelector, adapterSelectors.selectAll);
