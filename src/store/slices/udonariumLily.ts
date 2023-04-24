import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '@/domain/udonarium/post';

const initialState = {
  userId: '',
  playerName: 'プレイヤー',
  targetUserId: '',
  visiblePeerArea: true,
  visibleMap: true,
  chatText: '',
};

export const changeUdonariumPlayerName = createAsyncThunk<string, string>(
  'changeUdonariumPlayerName',
  async (req) => {
    postUdonariumMessage(req, 'change-player-name');
    return req;
  }
);

export const changeUdonariumTargetUserId = createAsyncThunk<string, string>(
  'changeUdonariumTargetUserId',
  async (req) => {
    // postUdonariumMessage(req, 'change-target-user-id');
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
    hidePeerArea(state) {
      state.visiblePeerArea = false;
    },
    setVisibleMap(state, action: PayloadAction<boolean>) {
      state.visibleMap = action.payload;
    },
    setChatText(state, action: PayloadAction<string>) {
      state.chatText = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(changeUdonariumPlayerName.fulfilled, (state, action) => {
        state.playerName = action.payload;
      })
      .addCase(changeUdonariumTargetUserId.fulfilled, (state, action) => {
        state.targetUserId = action.payload;
      }),
});
