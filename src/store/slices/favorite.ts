import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favorite, FavoriteMessage } from '@/domain/favorite/types';

export const favoritesAdapter = createEntityAdapter<Favorite>({
  selectId: (attr) => attr.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesAdapter.getInitialState<{ selectedId?: string }>({
    selectedId: undefined,
  }),
  reducers: {
    favoriteAdded: {
      reducer(state, action: PayloadAction<Favorite>) {
        favoritesAdapter.addOne(state, action.payload);
      },
      prepare(message: FavoriteMessage) {
        const entity = {
          ...message,
          createdAt: Date.now(),
        };
        return { payload: entity };
      },
    },
    favoritesReceived(state, action) {
      favoritesAdapter.setAll(state, action.payload);
    },
    favoritesAdd(state, action: PayloadAction<FavoriteMessage[]>) {
      const attributes = Object.values(state.entities).map((attr) => attr?.attributeId);
      const update = action.payload.filter((fav) => !attributes.includes(fav.attributeId));
      console.log('update', update);
      favoritesAdapter.upsertMany(
        state,
        update.map((fav) => ({ ...fav, createdAt: Date.now() }))
      );
    },
  },
});
