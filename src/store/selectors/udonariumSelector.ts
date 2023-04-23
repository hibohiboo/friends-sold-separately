import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const stateSelector = (state: RootState) => state.udonarium;
export const udonariumSelector = createSelector(stateSelector, (state) => {
  return state;
});
