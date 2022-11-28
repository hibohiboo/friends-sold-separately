import React from 'react';
import Friends from '../friends/List';
import Base from '../layouts/Base';

const FriendsPage: React.FC = () => {
  return (
    <Base>
      <Friends />
    </Base>
  );
};

export default FriendsPage;
