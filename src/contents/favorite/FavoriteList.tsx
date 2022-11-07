import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { favoriteEntitySelector } from '@/store/selectors/favoriteSelector';

const FavoriteList: React.FC = () => {
  const favorites = useAppSelector(favoriteEntitySelector);
  return (
    <div style={{ padding: '0 10px', backgroundColor: '#111' }}>
      <h2>握手履歴</h2>
      <div>
        {favorites.map((fav) => (
          <div key={fav.id}>
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
    </div>
  );
};

export default FavoriteList;
