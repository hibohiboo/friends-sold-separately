import { createAsyncThunk } from '@reduxjs/toolkit';
import { Attribute, Friend, FriendAttribute } from '@/domain/user/types';
import { RootState } from '..';
import { attributesSlice } from '../slices/attributes';
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
  // 自分が持っていない属性は追加する
  const state = thunkAPI.getState();
  const attributes = Object.values(state.attributes.entities) as Attribute[];
  if (
    !attributes.some((attr) => attr.type === req.attribute.type && attr.name === req.attribute.name)
  ) {
    thunkAPI.dispatch(
      attributesSlice.actions.attributeAdded({
        userIdentifier: state.userProfile.identifier,
        type: req.attribute.type,
        name: req.attribute.name,
      })
    );
  }
});
