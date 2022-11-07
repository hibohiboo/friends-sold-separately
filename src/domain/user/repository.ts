import { Dispatch, Middleware } from '@reduxjs/toolkit';
import { attributesSlice } from '@/store/slices/attributes';
import { userProfileSlice, UserProfileState } from '@/store/slices/userProfile';
import type { RootState } from '@/store';

const USER_LOCAL_STORAGE_KEY = 'JOURNEY_LOcAL_STORAGE_KEY';
const ATTRIBUTES_LOCAL_STORAGE_KEY = 'SCENARIOS_LOCAL_STORAGE_KEY';

export const initUser = (): UserProfileState | null => {
  const userJson = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (!userJson) return null;
  return JSON.parse(userJson) as UserProfileState;
};
export const initAttributes = () => {
  const attributesJson = localStorage.getItem(ATTRIBUTES_LOCAL_STORAGE_KEY);
  if (!attributesJson) return null;
  return JSON.parse(attributesJson);
};
export const initAttributeEntity = (dispatch: Dispatch) => {
  const user = initUser();

  if (user) dispatch(userProfileSlice.actions.userReceived(user));
  const attr = initAttributes();
  if (attr) dispatch(attributesSlice.actions.attributesReceived(attr));
};

export const persistMiddleWare: Middleware = (store) => (next) => (action) => {
  next(action);

  if (
    [
      userProfileSlice.actions.setUser.type,
      userProfileSlice.actions.setUserName.type,
      userProfileSlice.actions.toggleIsPublish.type,
      userProfileSlice.actions.addFavorite.type,
      userProfileSlice.actions.setTwitterId.type,
    ].includes(action.type)
  ) {
    const state: RootState = store.getState();
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(state.userProfile));
  }
  if (
    [
      attributesSlice.actions.attibuteRemove.type,
      attributesSlice.actions.attributeAdded.type,
      attributesSlice.actions.attributeUpdate.type,
    ].includes(action.type)
  ) {
    const state: RootState = store.getState();
    localStorage.setItem(
      ATTRIBUTES_LOCAL_STORAGE_KEY,
      JSON.stringify(Object.values(state.attributes.entities))
    );
  }
};
