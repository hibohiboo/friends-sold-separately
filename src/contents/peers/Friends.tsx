import React from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import { favoriteAttributes } from '@/store/actions/attributesDynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { friendsSelector } from '@/store/selectors/usersSelector';
import AttributeItem from './AttributeItem';

const Friends: React.FC = () => {
  const friends = useAppSelector(friendsSelector);
  const dispatch = useAppDispatch();

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegHandshake /> <div style={{ marginLeft: '1rem' }}>ぎゅっとはんど</div>
      </h2>
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
    </section>
  );
};
export default Friends;
