import React from 'react';
import { FaRegAddressCard, FaTwitter } from 'react-icons/fa';
import { ATTRIBUTE_ORDER, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { favoriteAttributes } from '@/store/actions/attributesDynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetUserByIdQuery } from '@/store/query/api';
import { myFavoriteSelector, userProfileSelector } from '@/store/selectors/userProfileSelector';
import AttributeTypeIcon from '../profile/AttributeTypeIcon';
import AttributeItem from './AttributeItem';

const Friend: React.FC<{ id: string }> = ({ id }) => {
  const { data, refetch } = useGetUserByIdQuery(id);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(myFavoriteSelector);
  const myProfile = useAppSelector(userProfileSelector);
  React.useEffect(() => {
    // MSWが設定されるまで開発環境では少し待つ
    if (import.meta.env.DEV) {
      (async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 300);
        });
        refetch();
      })();
    }
  }, [refetch]);

  if (!data) return <div>読込中...</div>;
  const types = Array.from(new Set(data.attributes.map((attr) => attr.type))).sort(
    (type) => -ATTRIBUTE_ORDER[type]
  );
  const attributes = data.attributes.map((attr) => ({
    ...attr,
    isFavorite: favorites.some((fav) => fav.id === attr.id),
    isSelf: myProfile.identifier === attr.userIdentifier,
  }));
  const friend = {
    userIdentifier: data.profile.userId,
    peerId: '',
    name: data.profile.name,
    twitterId: data.profile.twitterId,
    attributes,
    isNewly: types.includes(ATTRIBUTE_TYPE.Newly),
  };

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegAddressCard /> <div style={{ marginLeft: '1rem' }}>{data.profile.name}</div>
      </h2>
      <SubTitle twitterId={data.profile.twitterId} />
      {types.map((type) => (
        <div key={type} className="is-flex">
          <div>
            <AttributeTypeIcon type={type} />
          </div>
          <div>
            {attributes
              .filter((attr) => attr.type === type)
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
          </div>
        </div>
      ))}
    </section>
  );
};
export default Friend;
const SubTitle: React.FC<{ twitterId: string | undefined }> = ({ twitterId }) => {
  if (!twitterId) return <div />;
  return (
    <h3 className="subtitle">
      <a
        href={`https://twitter.com/${twitterId}`}
        title={twitterId}
        target="_blank"
        rel="noreferrer"
        style={{ marginLeft: '10px' }}
      >
        <FaTwitter /> {twitterId}
      </a>
    </h3>
  );
};
