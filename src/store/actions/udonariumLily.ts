import { createAsyncThunk } from '@reduxjs/toolkit';
import { postUdonariumMessage } from '@/domain/udonarium/post';
import { RootState } from '..';

export const connectUdonariumByTargetUserId = createAsyncThunk<
  void,
  undefined,
  { state: RootState }
>('connectUdonariumByTargetUserId', async (req, thunkAPI) => {
  postUdonariumMessage(thunkAPI.getState().udonarium.targetUserId, 'connect-by-target-user-id');
});
