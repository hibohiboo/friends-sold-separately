import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { AttributeType, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { updateAttributes } from '@/store/actions/dynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { newlySelector, plLikeSelector } from '@/store/selectors/attributesSelector';
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

const AttributeCheck: React.FC<{
  id: string;
  checked: boolean;
  change: () => void;
  type: AttributeType;
  labelText: string;
}> = ({ id, checked, change, type, labelText }) => {
  return (
    <label
      htmlFor={`input-${id}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        verticalAlign: 'center',
        padding: '5px 10px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <input type="checkbox" id={`input-${id}`} checked={checked} onChange={change} />
      </div>
      <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
        <AttributeTypeIcon type={type} />
        <span style={{ marginLeft: '0.5rem' }}>{labelText}</span>
      </div>
    </label>
  );
};

const AttributesCheckCreateForm: React.FC = () => {
  const user = useAppSelector(userProfileSelector);
  const newlyId = useAppSelector(newlySelector);
  const dispatch = useAppDispatch();
  const checkboxChageHandler = useCallback(
    (id: string | null, name: string, type: AttributeType) => () => {
      if (id) {
        dispatch(attributesSlice.actions.attibuteRemove(id));
      } else {
        dispatch(
          attributesSlice.actions.attributeAdded({
            userIdentifier: user.identifier,
            type,
            name,
          })
        );
        dispatch(updateAttributes());
      }
    },
    [dispatch, user.identifier]
  );
  const changeForNewly = checkboxChageHandler(newlyId, '初心者', ATTRIBUTE_TYPE.Newly);
  const plLikeId = useAppSelector(plLikeSelector);
  const changeForPLLike = checkboxChageHandler(newlyId, 'どちらかと言えばPL', ATTRIBUTE_TYPE.Like);
  return (
    <div>
      <AttributeCheck
        id="newly"
        labelText="初心者"
        type={ATTRIBUTE_TYPE.Newly}
        checked={!!newlyId}
        change={changeForNewly}
      />
      <AttributeCheck
        id="plLike"
        labelText="どちらかと言えばPL"
        type={ATTRIBUTE_TYPE.Like}
        checked={!!plLikeId}
        change={changeForPLLike}
      />

      <AttributeInputForm type={ATTRIBUTE_TYPE.Like} title="好き" userId={user.identifier} />
      <AttributeInputForm
        type={ATTRIBUTE_TYPE.WantToPlay}
        title="遊びたいシナリオ"
        userId={user.identifier}
      />

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
        type={ATTRIBUTE_TYPE.FavoriteReply}
        title="好きなリプレイ"
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
    </div>
  );
};
export default AttributesCheckCreateForm;
