import React from 'react';
import { favoriteAttributes } from '@/store/actions/attributesDynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { friendsSelector } from '@/store/selectors/usersSelector';
import AttributeItem from './AttributeItem';

const Friends: React.FC = () => {
  const friends = useAppSelector(friendsSelector);
  const dispatch = useAppDispatch();

  return (
    <ul style={{ listStyle: 'none' }}>
      {friends.map((friend) => (
        <li key={friend.userIdentifier}>
          {friend.twitterId ? (
            <a
              href={`https://twitter.com/${friend.twitterId}`}
              title={friend.name}
              target="_blank"
              rel="noreferrer"
            >
              {friend.name}
            </a>
          ) : (
            <span>{friend.name}</span>
          )}
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
            {friend.attributes.map((attr) => (
              <AttributeItem
                key={attr.id}
                attr={attr}
                clickHandler={() => {
                  if (attr.isFavorite) return;
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
