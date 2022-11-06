import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const peerSelector = (state: RootState) => state.peer;

export const selfUserSelector = createSelector(peerSelector, (peer) => {
  return peer.self;
});
export const peersSelector = createSelector(peerSelector, (peers) => {
  return peers.list.filter((peer) => peer.syncData.isPublish);
});
