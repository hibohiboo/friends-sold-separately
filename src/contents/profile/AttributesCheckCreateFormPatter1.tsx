/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { AttributeType, ATTRIBUTE_TYPE } from '@/domain/user/constants';
import { updateAttributes } from '@/store/actions/dynamo';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { userProfileSelector } from '@/store/selectors/userProfileSelector';
import { attributesSlice } from '@/store/slices/attributes';
import AttributeTypeIcon from './AttributeTypeIcon';
import { useCheckboxAttribute } from '@/hooks/useCheckboxAttribute';

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
        ??????
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
  const attrForNewly = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Newly);

  const attrForVoiceLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForTextLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForTextVoiceLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForOffLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);

  const attrForPLLike = useCheckboxAttribute('????????????????????????PL', ATTRIBUTE_TYPE.Like);
  const attrForGMLike = useCheckboxAttribute('????????????????????????GM', ATTRIBUTE_TYPE.Like);

  const attrForHorrorLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForMysteryLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForComedeyLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForBattlePvLike = useCheckboxAttribute('??????', ATTRIBUTE_TYPE.Like);
  const attrForEmotionalLike = useCheckboxAttribute('?????????????????????', ATTRIBUTE_TYPE.Like);
  const attrForUtiyosoLike = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.Like);
  const attrForShakaiLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForLoveScenarioLike = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.Like);
  const attrForWilldenessLike = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.Like);
  const attrForDungeionLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForLiddleLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForCityLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForClosedLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForSingleLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForKetudanLike = useCheckboxAttribute('???????????????????????????', ATTRIBUTE_TYPE.Like);
  const attrForR18Like = useCheckboxAttribute('R18', ATTRIBUTE_TYPE.Like);
  const attrForR18GLike = useCheckboxAttribute('R18-G', ATTRIBUTE_TYPE.Like);
  const attrForRihujinGLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForRihujinMine = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Mine);
  const attrFor1PLLike = useCheckboxAttribute('???~2PL', ATTRIBUTE_TYPE.Like);
  const attrFor3PlLike = useCheckboxAttribute('3PL??????', ATTRIBUTE_TYPE.Like);
  const attrForHitokuHOLike = useCheckboxAttribute('??????HO', ATTRIBUTE_TYPE.Like);
  const attrForPvPScenarioLike = useCheckboxAttribute('PvP????????????', ATTRIBUTE_TYPE.Like);
  const attrForHightLostLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForShorLike = useCheckboxAttribute('??????', ATTRIBUTE_TYPE.Like);
  const attrForMiddleLike = useCheckboxAttribute('??????', ATTRIBUTE_TYPE.Like);
  const attrForLongike = useCheckboxAttribute('??????', ATTRIBUTE_TYPE.Like);
  const attrForCampainLike = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.Like);
  const attrForShortScenarioLike = useCheckboxAttribute(
    '3?????????????????????????????????',
    ATTRIBUTE_TYPE.Like
  );
  const attrForLongtimeScenarioLike = useCheckboxAttribute(
    '3?????????????????????????????????',
    ATTRIBUTE_TYPE.Like
  );

  const attrForFriendsLike = useCheckboxAttribute('??????', ATTRIBUTE_TYPE.Like);
  const attrForBadyLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForLivalLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForLoveLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForKillLoveLike = useCheckboxAttribute('?????????', ATTRIBUTE_TYPE.Like);
  const attrForSishoDesiLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForSenpaiKohaiLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);

  const attrForNLLike = useCheckboxAttribute('NL', ATTRIBUTE_TYPE.Like);
  const attrForGLLike = useCheckboxAttribute('GL', ATTRIBUTE_TYPE.Like);
  const attrForBLLike = useCheckboxAttribute('BL', ATTRIBUTE_TYPE.Like);
  const attrForLoveMine = useCheckboxAttribute('??????RP??????', ATTRIBUTE_TYPE.Mine);

  const attrForBattleLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForDetectiveLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForConsiderationLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForEmoLike = useCheckboxAttribute('??????RP??????', ATTRIBUTE_TYPE.Like);
  const attrForTyabanLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForHitokuLike = useCheckboxAttribute('????????????', ATTRIBUTE_TYPE.Like);
  const attrForPvPLike = useCheckboxAttribute('PvP??????', ATTRIBUTE_TYPE.Like);
  const attrForUtuLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForUtuMine = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Mine);
  const attrForLostLike = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Like);
  const attrForLostMine = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.Mine);
  const attrForTakumaeLike = useCheckboxAttribute('??????????????????????????????', ATTRIBUTE_TYPE.Like);
  const attrForTakugoLike = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.Like);
  const attrForKateiLike = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.RolePlayType);
  const attrForClearLike = useCheckboxAttribute(
    '????????????????????????????????????',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForHodohodoLike = useCheckboxAttribute(
    '?????????????????????????????????',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForTappuriLike = useCheckboxAttribute(
    '????????????????????????????????????',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForRuleMine = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.Mine);

  const attrForScenarioSkill = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForIllustSkill = useCheckboxAttribute('????????????????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForNovelSkill = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForRoomSkill = useCheckboxAttribute('?????????????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForHukaoriSkill = useCheckboxAttribute('PC????????????????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForEngiSkill = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.SuperPower);
  const attrForKoemaneSkill = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.SuperPower);

  const attrForPlayTimeMonday = useCheckboxAttribute('?????????????????????', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeTuesday = useCheckboxAttribute(
    '?????????????????????',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeWednesday = useCheckboxAttribute(
    '?????????????????????',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeThirsday = useCheckboxAttribute(
    '?????????????????????',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeFriday = useCheckboxAttribute('?????????????????????', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeSaturday = useCheckboxAttribute(
    '?????????????????????',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeSunday = useCheckboxAttribute('?????????????????????', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeNight = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeMidnight = useCheckboxAttribute('??????????????????', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeAfternonn = useCheckboxAttribute(
    '??????????????????',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeFree = useCheckboxAttribute('???????????????', ATTRIBUTE_TYPE.PlayableTime);

  return (
    <div>
      <AttributeCheck {...attrForNewly} />
      <h3>???????????????????????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForVoiceLike} />
        <AttributeCheck {...attrForTextLike} />
        <AttributeCheck {...attrForTextVoiceLike} />
        <AttributeCheck {...attrForOffLike} />
      </div>
      <h3>GM/PL??????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForPLLike} />
        <AttributeCheck {...attrForGMLike} />
      </div>

      <h3>???????????????????????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForHorrorLike} />
        <AttributeCheck {...attrForMysteryLike} />
        <AttributeCheck {...attrForComedeyLike} />
        <AttributeCheck {...attrForBattlePvLike} />
        <AttributeCheck {...attrForEmotionalLike} />
        <AttributeCheck {...attrForUtiyosoLike} />
        <AttributeCheck {...attrForShakaiLike} />
        <AttributeCheck {...attrForLoveScenarioLike} />
        <AttributeCheck {...attrForWilldenessLike} />
        <AttributeCheck {...attrForDungeionLike} />
        <AttributeCheck {...attrForLiddleLike} />
        <AttributeCheck {...attrForCityLike} />
        <AttributeCheck {...attrForClosedLike} />
        <AttributeCheck {...attrForSingleLike} />
        <AttributeCheck {...attrForKetudanLike} />
        <AttributeCheck {...attrForR18Like} />
        <AttributeCheck {...attrForR18GLike} />
        <AttributeCheck {...attrForRihujinGLike} />
        <AttributeCheck {...attrForRihujinMine} />
        <AttributeCheck {...attrFor1PLLike} />
        <AttributeCheck {...attrFor3PlLike} />
        <AttributeCheck {...attrForHitokuHOLike} />
        <AttributeCheck {...attrForPvPScenarioLike} />
        <AttributeCheck {...attrForHightLostLike} />
        <AttributeCheck {...attrForShorLike} />
        <AttributeCheck {...attrForMiddleLike} />
        <AttributeCheck {...attrForLongike} />
        <AttributeCheck {...attrForCampainLike} />
        <AttributeCheck {...attrForShortScenarioLike} />
        <AttributeCheck {...attrForLongtimeScenarioLike} />
      </div>

      <h3>??????????????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForFriendsLike} />
        <AttributeCheck {...attrForBadyLike} />
        <AttributeCheck {...attrForLivalLike} />
        <AttributeCheck {...attrForLoveLike} />
        <AttributeCheck {...attrForKillLoveLike} />
        <AttributeCheck {...attrForSishoDesiLike} />
        <AttributeCheck {...attrForSenpaiKohaiLike} />
      </div>
      <h3>??????RP??????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForNLLike} />
        <AttributeCheck {...attrForGLLike} />
        <AttributeCheck {...attrForBLLike} />
        <AttributeCheck {...attrForLoveMine} />
      </div>

      <h3>???????????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForBattleLike} />
        <AttributeCheck {...attrForDetectiveLike} />
        <AttributeCheck {...attrForConsiderationLike} />
        <AttributeCheck {...attrForEmoLike} />
        <AttributeCheck {...attrForTyabanLike} />
        <AttributeCheck {...attrForHitokuLike} />
        <AttributeCheck {...attrForPvPLike} />
        <AttributeCheck {...attrForUtuLike} />
        <AttributeCheck {...attrForUtuMine} />
        <AttributeCheck {...attrForLostLike} />
        <AttributeCheck {...attrForLostMine} />
        <AttributeCheck {...attrForTakumaeLike} />
        <AttributeCheck {...attrForTakugoLike} />
        <AttributeCheck {...attrForKateiLike} />
        <AttributeCheck {...attrForClearLike} />
        <AttributeCheck {...attrForHodohodoLike} />
        <AttributeCheck {...attrForTappuriLike} />
        <AttributeCheck {...attrForRuleMine} />
      </div>
      <h3>?????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForScenarioSkill} />
        <AttributeCheck {...attrForIllustSkill} />
        <AttributeCheck {...attrForNovelSkill} />
        <AttributeCheck {...attrForRoomSkill} />
        <AttributeCheck {...attrForHukaoriSkill} />
        <AttributeCheck {...attrForEngiSkill} />
        <AttributeCheck {...attrForKoemaneSkill} />
      </div>
      <h3>???????????????</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForPlayTimeMonday} />
        <AttributeCheck {...attrForPlayTimeTuesday} />
        <AttributeCheck {...attrForPlayTimeWednesday} />
        <AttributeCheck {...attrForPlayTimeThirsday} />
        <AttributeCheck {...attrForPlayTimeFriday} />
        <AttributeCheck {...attrForEngiSkill} />
        <AttributeCheck {...attrForPlayTimeSaturday} />
        <AttributeCheck {...attrForPlayTimeSunday} />
        <AttributeCheck {...attrForPlayTimeNight} />
        <AttributeCheck {...attrForPlayTimeMidnight} />
        <AttributeCheck {...attrForPlayTimeAfternonn} />
        <AttributeCheck {...attrForPlayTimeFree} />
      </div>
      <details>
        <summary>????????????...</summary>
        <AttributeInputForm type={ATTRIBUTE_TYPE.Like} title="??????" userId={user.identifier} />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.RolePlayType}
          title="????????????????????????"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.SuperPower}
          title="?????????"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.PlayableTime}
          title="???????????????"
          userId={user.identifier}
        />
        <AttributeInputForm
          type={ATTRIBUTE_TYPE.Mine}
          title="?????????????????????????????????????????????"
          userId={user.identifier}
        />
      </details>
      <AttributeInputForm
        type={ATTRIBUTE_TYPE.WantToPlay}
        title="????????????????????????"
        userId={user.identifier}
      />

      <AttributeInputForm
        type={ATTRIBUTE_TYPE.FunScenario}
        title="???????????????????????????"
        userId={user.identifier}
      />
      <AttributeInputForm
        type={ATTRIBUTE_TYPE.Rulebook}
        title="????????????????????????"
        userId={user.identifier}
      />
      <AttributeInputForm
        type={ATTRIBUTE_TYPE.FavoriteReply}
        title="?????????????????????"
        userId={user.identifier}
      />
    </div>
  );
};
export default AttributesCheckCreateForm;
