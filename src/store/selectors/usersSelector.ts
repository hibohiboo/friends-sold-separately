import { createSelector } from '@reduxjs/toolkit';
import { ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { Friend } from '@/domain/user/types';
import { myFavoriteSelector, userProfileSelector } from './userProfileSelector';
import { RootState } from '../index';

const usersSelector = (state: RootState) => state.users;

export const friendsSelector = createSelector(
  usersSelector,
  myFavoriteSelector,
  userProfileSelector,
  (users, favorites, myProfile) => {
    return users.list
      .filter((user) => user.profile.isPublish)
      .sort((a, b) => (b.profile?.updatedAt || 0) - (a.profile?.updatedAt || 0))
      .map(
        (user): Friend => ({
          userIdentifier: user.profile.userId,
          peerId: '',
          name: user.profile.name,
          twitterId: user.profile.twitterId,
          isNewly: user.attributes.map((attr) => attr.type).includes(ATTRIBUTE_TYPE.Newly),
          attributes: user.attributes.map((attr) => ({
            ...attr,
            isFavorite: favorites.some((fav) => fav.id === attr.id),
            isSelf: myProfile.identifier === attr.userIdentifier,
          })),
        })
      );
  }
);
