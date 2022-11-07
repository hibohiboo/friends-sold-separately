import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { AttributeType, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { updateAttributes } from '@/store/actions/connect';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { newlySelector } from '@/store/selectors/attributesSelector';
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

const AttributeInputForm: React.FC<{ userId: string; type: AttributeType; title: string }> = ({
  userId,
  type,
  title,
}) => {
  const attr = useAttribute(userId, type);
  return (
    <div>
      <Title type={type} text={title} />
      <label htmlFor={`input-name-${type}`} style={{ margin: '0.5rem' }}>
        <input
          id={`input-name-${type}`}
          onChange={attr.changeHandler}
          style={{ width: '200px' }}
          value={attr.name}
        />
      </label>

      <button type="button" onClick={attr.submitHandler} style={{ cursor: 'pointer' }}>
        追加
      </button>
    </div>
  );
};

const AttributesCreateForm: React.FC = () => {
  const user = useAppSelector(userProfileSelector);
  const newlyId = useAppSelector(newlySelector);
  const dispatch = useAppDispatch();
  return (
    <div>
      <AttributeInputForm type={ATTRIBUTE_TYPE.Like} title="好き" userId={user.identifier} />
      <AttributeInputForm
        type={ATTRIBUTE_TYPE.WantToPlay}
        title="遊びたいシナリオ"
        userId={user.identifier}
      />
      <details>
        <summary>もっと詳しく...</summary>
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.FunScenario}
          title="楽しかったシナリオ"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.Rulebook}
          title="遊びたいシステム"
          userId={user.identifier}
        />

        <AttributeInputForm
          type={ATTRIBUTE_TYPE.RolePlayType}
          title="ロールプレイ傾向"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.SuperPower}
          title="スキル"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.PlayableTime}
          title="遊べる時間"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.Mine}
          title="苦手。地雷。好きな人はごめん。"
          userId={user.identifier}
        />
      </details>
      <label
        htmlFor="input-newly"
        style={{
          display: 'flex',
          alignItems: 'center',
          verticalAlign: 'center',
          padding: '5px 10px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <input
            type="checkbox"
            id="input-newly"
            checked={!!newlyId}
            onChange={() => {
              if (newlyId) {
                dispatch(attributesSlice.actions.attibuteRemove(newlyId));
              } else {
                dispatch(
                  attributesSlice.actions.attributeAdded({
                    userIdentifier: user.identifier,
                    type: ATTRIBUTE_TYPE.Newly,
                    name: '初心者',
                  })
                );
              }

              dispatch(updateAttributes());
            }}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <AttributeTypeIcon type={ATTRIBUTE_TYPE.Newly} />
          <span style={{ marginLeft: '0.5rem' }}>初心者</span>
        </div>
      </label>
    </div>
  );
};
export default AttributesCreateForm;
