import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '@/domain/udonarium/post';

const initialState = {
  userId: '',
  playerName: 'プレイヤー',
};

export const changeUdonariumPlayerName = createAsyncThunk<string, string>(
  'changeUdonariumPlayerName',
  async (req) => {
    postUdonariumMessage(req, 'change-player-name');
    return req;
  }
);

export const udonariumLilySlice = createSlice({
  name: 'udonariumLily',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(changeUdonariumPlayerName.fulfilled, (state, action) => {
      state.playerName = action.payload;
    }),
});
