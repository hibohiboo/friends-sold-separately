import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { udonariumLilyChatAdapter } from '../slices/udonariumLilyChat';

const chatSelector = (state: RootState) => state.udonariumLilyChat;
const adapterSelectors = udonariumLilyChatAdapter.getSelectors();

export const udonariumLilyChatSelector = createSelector(chatSelector, adapterSelectors.selectAll);
