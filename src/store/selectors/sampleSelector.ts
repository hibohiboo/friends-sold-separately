import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const sampleSelector = (state: RootState) => state.sample;

export const countSelector = createSelector(sampleSelector, (sample) => {
  return sample.count;
});
