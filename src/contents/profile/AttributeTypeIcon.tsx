import React from 'react';
import { BsFillTagFill, BsTrophy } from 'react-icons/bs';
import { FaBookOpen, FaMask } from 'react-icons/fa';
import { GiUnlitBomb } from 'react-icons/gi';
import { MdAccessTime, MdFavorite, MdLocalMovies, MdOutlineGrade } from 'react-icons/md';
import { ATTRIBUTE_TYPE } from '@/domain/user/constants';
import mascleIcon from '@/assets/icons/mascle.svg';
import newlyIcon from '@/assets/icons/newly.svg';

const AttributeTypeIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case ATTRIBUTE_TYPE.Rulebook:
      return <FaBookOpen />;
    case ATTRIBUTE_TYPE.WantToPlay:
      return <MdOutlineGrade />;
    case ATTRIBUTE_TYPE.Mine:
      return <GiUnlitBomb />;
    case ATTRIBUTE_TYPE.PlayableTime:
      return <MdAccessTime />;
    case ATTRIBUTE_TYPE.FunScenario:
      return <BsTrophy />;
    case ATTRIBUTE_TYPE.Newly:
      return <img src={newlyIcon} alt="初心者" style={{ width: '1rem' }} />;
    case ATTRIBUTE_TYPE.SuperPower:
      return <img src={mascleIcon} alt="スキル" style={{ width: '1rem' }} />;
    case ATTRIBUTE_TYPE.Like:
      return <MdFavorite />;
    case ATTRIBUTE_TYPE.RolePlayType:
      return <FaMask />;
    case ATTRIBUTE_TYPE.FavoriteReply:
      return <MdLocalMovies />;
  }
  return <BsFillTagFill />;
};

export default AttributeTypeIcon;
