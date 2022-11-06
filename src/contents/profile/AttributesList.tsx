import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { attributesEntitySelector } from '@/store/selectors/attributesSelector';
import { attributesSlice } from '@/store/slices/attributes';

const AttributesList: React.FC = () => {
  const attributes = useAppSelector(attributesEntitySelector);
  const dispatch = useAppDispatch();
  const deleteHandler = (id: string) => {
    dispatch(attributesSlice.actions.attibuteRemove(id));
  };
  return (
    <ul style={{ display: 'flex', listStyle: 'none', padding: '0' }}>
      {attributes.map((attr) => (
        <li
          key={attr.id}
          style={{ border: 'solid 1px #eee', marginLeft: '0.5rem', padding: '5px' }}
        >
          <span>{attr.name}</span>
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
