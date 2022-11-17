import React from 'react';
import FavoriteList from '../favorite/FavoriteList';
import Base from '../layouts/Base';

const FriendsPage: React.FC = () => {
  return (
    <Base>
      <FavoriteList />
    </Base>
  );
};

export default FriendsPage;
