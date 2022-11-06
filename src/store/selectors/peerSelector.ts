import { createSelector } from '@reduxjs/toolkit';
import { Friend } from '@/domain/user/types';
import { RootState } from '../index';
import { myFavoriteSelector } from './userProfileSelector';

const peerSelector = (state: RootState) => state.peer;

export const selfUserSelector = createSelector(peerSelector, (peer) => {
  return peer.self;
});
export const friendsSelector = createSelector(
  peerSelector,
  myFavoriteSelector,
  (peers, favorites) => {
    return peers.list
      .filter((peer) => peer.syncData.isPublish)
      .map(
        (peer): Friend => ({
          userIdentifier: peer.identifier,
          peerId: peer.syncData.peerId,
          name: peer.syncData.name,
          attributes: peer.syncData.attributes.map((attr) => ({
            ...attr,
            isFavorite: favorites.some((fav) => fav.id === attr.id),
          })),
        })
      );
  }
);
