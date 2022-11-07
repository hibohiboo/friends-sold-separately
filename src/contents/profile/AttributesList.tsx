import React from 'react';
import { updateAttributes } from '@/store/actions/connect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { attributesEntitySelector } from '@/store/selectors/attributesSelector';
import { attributesSlice } from '@/store/slices/attributes';
import AttributeTypeIcon from './AttributeTypeIcon';

const AttributesList: React.FC = () => {
  const attributes = useAppSelector(attributesEntitySelector);
  const dispatch = useAppDispatch();
  const deleteHandler = (id: string) => {
    dispatch(attributesSlice.actions.attibuteRemove(id));
    dispatch(updateAttributes());
  };
  return (
    <ul style={{ display: 'flex', listStyle: 'none', padding: '0', flexWrap: 'wrap' }}>
      {attributes.map((attr) => (
        <li
          key={attr.id}
          style={{
            border: 'solid 1px #eee',
            marginLeft: '0.5rem',
            marginTop: '0.5rem',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', padding: '0 5px' }}>
            <AttributeTypeIcon type={attr.type} />
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>{attr.name}</div>
          <button
            type="button"
            onClick={() => deleteHandler(attr.id)}
            style={{ marginLeft: '10px' }}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};
export default AttributesList;
