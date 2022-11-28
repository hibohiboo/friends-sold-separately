import React, { useState } from 'react';
import { FaRegHandshake } from 'react-icons/fa';
import { ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { favoriteAttributes } from '@/store/actions/attributesDynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { friendsSelector } from '@/store/selectors/usersSelector';
import AttributeTypeIcon from '../profile/AttributeTypeIcon';
import AttributeItem from './AttributeItem';

const Friends: React.FC = () => {
  const friends = useAppSelector(friendsSelector);
  const dispatch = useAppDispatch();
  const [selectedType, setSelectedType] = useState('');

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegHandshake /> <div style={{ marginLeft: '1rem' }}>ぎゅっとはんど</div>
      </h2>
      <div style={{ width: '80vw', overflowX: 'auto' }}>
        <div className="tabs is-boxed">
          <ul>
            {Object.values(ATTRIBUTE_TYPE)
              .filter((type) => type !== ATTRIBUTE_TYPE.Newly)
              .map((type, i) => {
                return (
                  <li key={type} className={type === selectedType ? 'is-active' : ''}>
                    <a
                      onClick={() => {
                        if (type === selectedType) {
                          setSelectedType('');
                          return;
                        }
                        setSelectedType(type);
                      }}
                      role="button"
                      type="button"
                      tabIndex={i}
                      onKeyUp={() => {
                        if (type === selectedType) {
                          setSelectedType('');
                          return;
                        }
                        setSelectedType(type);
                      }}
                    >
                      <span className="icon is-small">
                        <AttributeTypeIcon type={type} />
                      </span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <ul style={{ listStyle: 'none' }}>
        {friends.map((friend) => (
          <li key={friend.userIdentifier} style={{ padding: '10px' }}>
            {friend.isNewly ? <AttributeTypeIcon type={ATTRIBUTE_TYPE.Newly} /> : <div />}
            {friend.twitterId ? (
              <a
                href={`https://twitter.com/${friend.twitterId}`}
                title={friend.name}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: '10px' }}
              >
                {friend.name}
              </a>
            ) : (
              <span style={{ marginLeft: '10px' }}>{friend.name}</span>
            )}
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
              {friend.attributes
                .filter(
                  (a) =>
                    a.type !== ATTRIBUTE_TYPE.Newly &&
                    (selectedType === '' || a.type === selectedType)
                )
                .map((attr) => (
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
