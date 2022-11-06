import { createAsyncThunk } from '@reduxjs/toolkit';
import { Friend, FriendAttribute } from '@/domain/user/types';
import { RootState } from '..';
import { userProfileSlice } from '../slices/userProfile';

export const favoriteAttributes = createAsyncThunk<
  void,
  { friend: Friend; attribute: FriendAttribute },
  { state: RootState }
>('favoriteAttributes', async (req, thunkAPI) => {
  thunkAPI.dispatch(
    userProfileSlice.actions.addFavorite({
      id: req.attribute.id,
      userIdentifier: req.friend.userIdentifier,
      userName: req.friend.name,
      type: req.attribute.type,
      name: req.attribute.name,
    })
  );
});
