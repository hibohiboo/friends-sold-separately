import React from 'react';
import { favoriteAttributes } from '@/store/actions/attributes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { friendsSelector } from '@/store/selectors/peerSelector';
import AttributeItem from './AttributeItem';

const Friends: React.FC = () => {
  const friends = useAppSelector(friendsSelector);
  const dispatch = useAppDispatch();

  return (
    <ul style={{ listStyle: 'none' }}>
      {friends.map((friend) => (
        <li key={friend.userIdentifier}>
          <span>{friend.name}</span>
          <ul style={{ listStyle: 'none', display: 'flex' }}>
            {friend.attributes.map((attr) => (
              <AttributeItem
                key={attr.id}
                attr={attr}
                clickHandler={() => {
                  dispatch(favoriteAttributes({ friend, attribute: attr }));
                }}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
export default Friends;
