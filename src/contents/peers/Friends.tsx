import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { peersSelector } from '@/store/selectors/peerSelector';

const Friends: React.FC = () => {
  const peers = useAppSelector(peersSelector);

  return (
    <ul>
      {peers.map((peer) => (
        <li key={peer.identifier}>
          <span>{peer.syncData.name}</span>
        </li>
      ))}
    </ul>
  );
};
export default Friends;
