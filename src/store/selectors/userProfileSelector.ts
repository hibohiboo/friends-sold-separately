import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const userProfileSelector = (state: RootState) => state.userProfile;
export const myFavoriteSelector = createSelector(userProfileSelector, (profile) => {
  return profile.favoriteAttribute;
});
