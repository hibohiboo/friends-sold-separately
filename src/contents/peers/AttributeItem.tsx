import { FaRegHandshake, FaBookOpen } from 'react-icons/fa';
import { Attribute } from '@/domain/user/types';

const AttributeItem: React.FC<{ attr: Attribute }> = ({ attr }) => {
  return (
    <li
      style={{ border: 'solid 1px #eee', marginLeft: '1rem', padding: '5px 10px', display: 'flex' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaBookOpen />
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
          color: '#fa0',
          padding: '0 10px',
        }}
        title="僕も私も！"
      >
        <FaRegHandshake />
      </div>
    </li>
  );
};
export default AttributeItem;
