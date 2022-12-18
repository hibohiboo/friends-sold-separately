import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegAddressCard, FaTwitter } from 'react-icons/fa';
import { MdLocalMovies } from 'react-icons/md';
import { ATTRIBUTE_ORDER, ATTRIBUTE_TITLE, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { favoriteAttributes } from '@/store/actions/attributesDynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useGetUserByIdQuery } from '@/store/query/api';
import { myFavoriteSelector, userProfileSelector } from '@/store/selectors/userProfileSelector';
import AttributeTypeIcon from '../profile/AttributeTypeIcon';
import AttributeItem from './AttributeItem';
import newlyIcon from '@/assets/icons/newly.svg';

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
  const uniqueTypes = Array.from(new Set(data.attributes.map((attr) => attr.type)));

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
    isNewly: uniqueTypes.includes(ATTRIBUTE_TYPE.Newly),
  };

  const types = uniqueTypes
    .filter((type) => type !== ATTRIBUTE_TYPE.Newly)
    .sort((type) => -ATTRIBUTE_ORDER[type]);

  return (
    <section className="section">
      <h2 className="title is-flex">
        <FaRegAddressCard />
        {friend.isNewly ? (
          <img src={newlyIcon} alt="初心者" style={{ width: '2rem', marginLeft: '1rem' }} />
        ) : (
          <span />
        )}
        <div style={{ marginLeft: '1rem' }}>{friend.name}</div>
      </h2>
      <SubTitle twitterId={friend.twitterId} />
      {types.map((type) => (
        <div key={type} style={{ padding: '1rem' }}>
          <div>
            <AttributeTypeIcon type={type} />
            <span style={{ marginLeft: '1rem' }}> {ATTRIBUTE_TITLE[type]}</span>
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
      {friend.twitterId === 'hibohiboo' ? (
        <p style={{ padding: '30px' }}>
          <Link to="/gallery">
            <MdLocalMovies /> <span style={{ paddingLeft: '1rem' }}>ひぼのギャラリー </span>
          </Link>
          <span>※ギャラリー機能はベータ版機能です。使いたい場合は管理者に連絡ください</span>
        </p>
      ) : (
        <div />
      )}
      <p style={{ padding: '30px' }}>
        <a
          className="button is-primary twitter-hashtag-button"
          href={`https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&text=僕の私のTRPG説明書を作成しました。&hashtags=ぎゅっとはんど&url=https%3A%2F%2Fd3snr6xc5uvnuy.cloudfront.net%2Ffriends-shakehand%2Ffriend%2F${friend.userIdentifier}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter /> <span style={{ paddingLeft: '1rem' }}>呟く</span>
        </a>
      </p>
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
