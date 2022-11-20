import { createSelector } from '@reduxjs/toolkit';
import { ATTRIBUTE_TYPE } from '@/domain/user/constants';
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

export const newlySelector = createSelector(attributesEntitySelector, (attributes) => {
  if (!attributes) return null;
  const newly = attributes.find((attr) => attr.type === ATTRIBUTE_TYPE.Newly);
  if (!newly) return null;
  return newly.id;
});

// ------------
const checkboxSelecter = (name: string) =>
  createSelector(attributesEntitySelector, (attributes) => {
    if (!attributes) return null;
    const item = attributes.find((attr) => attr.name === name);
    if (!item) return null;
    return item.id;
  });

export const plLikeSelector = checkboxSelecter('どちらかと言えばPL');
