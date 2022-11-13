import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PutUserContext } from '@/domain/user/types';

// コンパイラが ts4023のエラーを const store = configureStore で出すので解決のためにexport
export interface UsersState {
  list: PutUserContext[];
}

const initialState: UsersState = {
  list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersContext(state, action: PayloadAction<PutUserContext[]>) {
      state.list = action.payload;
    },
  },
});
