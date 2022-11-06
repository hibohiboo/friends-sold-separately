import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// コンパイラが ts4023のエラーを const store = configureStore で出すので解決のためにexport
export interface SampleState {
  count: number;
}

const initialState: SampleState = {
  count: 0,
};

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});
