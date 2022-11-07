/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FaRegHandshake } from 'react-icons/fa';
import { FriendAttribute } from '@/domain/user/types';
import AttributeTypeIcon from '../profile/AttributeTypeIcon';

const AttributeItem: React.FC<{ attr: FriendAttribute; clickHandler: () => void }> = ({
  attr,
  clickHandler,
}) => {
  return (
    <li
      style={{
        border: 'solid 1px #eee',
        marginLeft: '1rem',
        marginTop: '0.5rem',
        padding: '5px 10px',
        display: 'flex',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AttributeTypeIcon type={attr.type} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>{attr.name}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '1rem',
          fontSize: '2rem',
          cursor: 'pointer',
          // backgroundColor: '#f34',
          color: attr.isFavorite ? '#fa0' : '#aaa',
          padding: '0 10px',
        }}
        title="僕も私も！"
        onClick={clickHandler}
      >
        <FaRegHandshake />
      </div>
    </li>
  );
};
export default AttributeItem;
