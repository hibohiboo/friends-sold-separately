import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { attributesAdapter } from '../slices/attributes';

const attributesSelector = (state: RootState) => state.attributes;
const attributesSelectors = attributesAdapter.getSelectors();

export const attributesEntitySelector = createSelector(
  attributesSelector,
  attributesSelectors.selectAll
);

export const selectedAttributeById = (state: RootState) => {
  if (state.attributes.selectedId) {
    return attributesAdapter
      .getSelectors()
      .selectById(state.attributes, state.attributes.selectedId);
  }
  return undefined;
};

export const selectedAttributeIdSelector = createSelector(
  attributesSelector,
  (state) => state.selectedId
);
