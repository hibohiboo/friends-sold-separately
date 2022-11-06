import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UUID } from '@/domain/udonarium/class/core/system/util/uuid';
import { Attribute, AttributeEditForm } from '@/domain/user/types';

export const attributesAdapter = createEntityAdapter<Attribute>({
  selectId: (attr) => attr.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const attributesSlice = createSlice({
  name: 'attributes',
  initialState: attributesAdapter.getInitialState<{ selectedId?: string }>({
    selectedId: undefined,
  }),
  reducers: {
    attributeAdded: {
      reducer(state, action: PayloadAction<Attribute>) {
        attributesAdapter.addOne(state, action.payload);
      },
      prepare(form: AttributeEditForm) {
        const { name, type, userIdentifier } = form;
        const now = Date.now();
        const entity = {
          id: UUID.generateUuid(),
          name,
          type,
          userIdentifier,
          createdAt: now,
        };
        return { payload: entity };
      },
    },
    attributeUpdate(state, action: PayloadAction<Attribute>) {
      attributesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    attibuteRemove(state, action: PayloadAction<string>) {
      attributesAdapter.removeOne(state, action.payload);
    },
    selectId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
    resetId(state) {
      state.selectedId = undefined;
    },
    attributesReceived(state, action) {
      attributesAdapter.setAll(state, action.payload);
    },
  },
});
