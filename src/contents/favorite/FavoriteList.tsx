import React from 'react';
import { MdNotifications } from 'react-icons/md';
import { useAppSelector } from '@/store/hooks';
import { favoriteEntitySelector } from '@/store/selectors/favoriteSelector';

const FavoriteList: React.FC = () => {
  const favorites = useAppSelector(favoriteEntitySelector);

  return (
    <section className="section">
      <h2 className="title is-flex">
        <MdNotifications />
        <div style={{ marginLeft: '1rem' }}>僕も私も</div>
      </h2>
      <div>
        {favorites.length === 0 ? <div>トモダチからあなたへの握手はまだありません</div> : <div />}
        {favorites.map((fav) => (
          <div key={fav.id} style={{ marginBottom: '10px' }}>
            {fav.friendTwitterId ? (
              <a
                href={`https://twitter.com/${fav.friendTwitterId}`}
                title={fav.friendName}
                target="_blank"
                rel="noreferrer"
              >
                {fav.friendName}
              </a>
            ) : (
              fav.friendName
            )}
            が【{fav.attributeName}】に握手しました
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoriteList;
