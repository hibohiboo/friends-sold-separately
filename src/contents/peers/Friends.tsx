import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { peersSelector } from '@/store/selectors/peerSelector';
import AttributeItem from './AttributeItem';

const Friends: React.FC = () => {
  const peers = useAppSelector(peersSelector);

  return (
    <ul style={{ listStyle: 'none' }}>
      {peers.map((peer) => (
        <li key={peer.identifier}>
          <span>{peer.syncData.name}</span>
          <ul style={{ listStyle: 'none', display: 'flex' }}>
            {peer.syncData.attributes.map((attr) => (
              <AttributeItem key={attr.id} attr={attr} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
export default Friends;
