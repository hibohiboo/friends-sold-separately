import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { AttributeType, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { updateAttributes } from '@/store/actions/connect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { attributesSlice } from '@/store/slices/attributes';
import AttributeTypeIcon from './AttributeTypeIcon';

const Title: React.FC<{ type: string; text: string }> = ({ type, text }) => {
  return (
    <h4 style={{ marginBottom: '0', display: 'flex', alignItems: 'center' }}>
      <AttributeTypeIcon type={type} />
      <span style={{ marginLeft: '0.5rem' }}>{text}</span>
    </h4>
  );
};

const useAttribute = (identifier: string, type: AttributeType) => {
  const dispatch = useAppDispatch();
  const [name, setRuleBookName] = useState('');
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setRuleBookName(e.target.value);
    },
    [setRuleBookName]
  );
  const submitHandler = useCallback(() => {
    if (name === '') return;
    dispatch(
      attributesSlice.actions.attributeAdded({
        userIdentifier: identifier,
        type,
        name,
      })
    );

    dispatch(updateAttributes());
    setRuleBookName('');
  }, [dispatch, identifier, name, type]);
  return { name, changeHandler, submitHandler } as const;
};

const AttributesCreateForm: React.FC = () => {
  const user = useAppSelector(userProfileSelector);

  const rulebook = useAttribute(user.identifier, ATTRIBUTE_TYPE.Rulebook);

  return (
    <div>
      <div>
        <Title type={ATTRIBUTE_TYPE.Rulebook} text="遊びたいシステム" />
        <label htmlFor="input-name" style={{ margin: '0.5rem' }}>
          <input
            id="input-name"
            onChange={rulebook.changeHandler}
            style={{ width: '200px' }}
            value={rulebook.name}
          />
        </label>

        <button type="button" onClick={rulebook.submitHandler} style={{ cursor: 'pointer' }}>
          追加
        </button>
      </div>
      <Title type={ATTRIBUTE_TYPE.WantToPlay} text="遊びたいシナリオ" />
      <Title type={ATTRIBUTE_TYPE.FunScenario} text="楽しかったシナリオ" />
      <Title type={ATTRIBUTE_TYPE.Like} text="好き" />
      <Title type={ATTRIBUTE_TYPE.SuperPower} text="スキル" />
      <Title type={ATTRIBUTE_TYPE.PlayableTime} text="遊べる時間" />
      <Title type={ATTRIBUTE_TYPE.Mine} text="苦手。地雷。好きな人はごめん。" />
      <Title type={ATTRIBUTE_TYPE.Newly} text="初心者" />
    </div>
  );
};
export default AttributesCreateForm;
