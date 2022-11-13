import { createSelector } from '@reduxjs/toolkit';
import { Friend } from '@/domain/user/types';
import { RootState } from '../index';
import { myFavoriteSelector, userProfileSelector } from './userProfileSelector';

const usersSelector = (state: RootState) => state.users;

export const friendsSelector = createSelector(
  usersSelector,
  myFavoriteSelector,
  userProfileSelector,
  (users, favorites, myProfile) => {
    return users.list
      .filter((user) => user.profile.isPublish)
      .map(
        (user): Friend => ({
          userIdentifier: user.profile.userId,
          peerId: '',
          name: user.profile.name,
          twitterId: user.profile.twitterId,
          attributes: user.attributes.map((attr) => ({
            ...attr,
            isFavorite: favorites.some((fav) => fav.id === attr.id),
            isSelf: myProfile.identifier === attr.userIdentifier,
          })),
        })
      );
  }
);
