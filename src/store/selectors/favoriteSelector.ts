import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { favoritesAdapter } from '../slices/favorite';

const favoritesSelector = (state: RootState) => state.favorites;
const favoritesSelectors = favoritesAdapter.getSelectors();

export const favoriteEntitySelector = createSelector(
  favoritesSelector,
  favoritesSelectors.selectAll
);
