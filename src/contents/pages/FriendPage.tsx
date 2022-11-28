import React from 'react';
import { useParams } from 'react-router-dom';
import Friend from '../friends/Friend';
import Base from '../layouts/Base';

const FriendPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Base>
      <Friend id={id!} />
    </Base>
  );
};

export default FriendPage;
