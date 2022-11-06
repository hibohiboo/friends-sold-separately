import React, { ChangeEventHandler, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { updateAttributes } from '@/store/actions/connect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { attributesSlice } from '@/store/slices/attributes';

const AttributesCreateForm: React.FC = () => {
  const user = useAppSelector(userProfileSelector);
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const nameChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const submitHandler = () => {
    if (name === '') return;
    dispatch(
      attributesSlice.actions.attributeAdded({
        userIdentifier: user.identifier,
        type: 'RuleBook',
        name,
      })
    );
    setName('');
    dispatch(updateAttributes());
  };

  return (
    <div>
      <h4 style={{ marginBottom: '0', display: 'flex', alignItems: 'center' }}>
        <FaBookOpen />
        <span style={{ marginLeft: '0.5rem' }}>遊びたいシステム</span>
      </h4>
      <label htmlFor="input-name" style={{ margin: '0.5rem' }}>
        <input
          id="input-name"
          // placeholder="システム名を入力してください"
          onChange={nameChangeHandler}
          style={{ width: '200px' }}
          value={name}
        />
      </label>

      <button type="button" onClick={submitHandler} style={{ cursor: 'pointer' }}>
        追加
      </button>
    </div>
  );
};
export default AttributesCreateForm;
