import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
};

export const udonariumLilySlice = createSlice({
  name: 'udonariumLily',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});
