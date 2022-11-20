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
  const attrForNewly = useCheckboxAttribute('初心者', ATTRIBUTE_TYPE.Newly);

  const attrForVoiceLike = useCheckboxAttribute('ボイセ', ATTRIBUTE_TYPE.Like);
  const attrForTextLike = useCheckboxAttribute('テキセ', ATTRIBUTE_TYPE.Like);
  const attrForTextVoiceLike = useCheckboxAttribute('半テキセ', ATTRIBUTE_TYPE.Like);
  const attrForOffLike = useCheckboxAttribute('オフセ', ATTRIBUTE_TYPE.Like);

  const attrForPLLike = useCheckboxAttribute('どちらかと言えばPL', ATTRIBUTE_TYPE.Like);
  const attrForGMLike = useCheckboxAttribute('どちらかと言えばGM', ATTRIBUTE_TYPE.Like);

  const attrForHorrorLike = useCheckboxAttribute('ホラー', ATTRIBUTE_TYPE.Like);
  const attrForMysteryLike = useCheckboxAttribute('ミステリ', ATTRIBUTE_TYPE.Like);
  const attrForComedeyLike = useCheckboxAttribute('コメディ', ATTRIBUTE_TYPE.Like);
  const attrForBattlePvLike = useCheckboxAttribute('戦闘', ATTRIBUTE_TYPE.Like);
  const attrForEmotionalLike = useCheckboxAttribute('エモーショナル', ATTRIBUTE_TYPE.Like);
  const attrForUtiyosoLike = useCheckboxAttribute('うちよそシナリオ', ATTRIBUTE_TYPE.Like);
  const attrForShakaiLike = useCheckboxAttribute('社会派', ATTRIBUTE_TYPE.Like);
  const attrForLoveScenarioLike = useCheckboxAttribute('恋愛シナリオ', ATTRIBUTE_TYPE.Like);
  const attrForWilldenessLike = useCheckboxAttribute('ウィルダネス', ATTRIBUTE_TYPE.Like);
  const attrForDungeionLike = useCheckboxAttribute('ダンジョン', ATTRIBUTE_TYPE.Like);
  const attrForLiddleLike = useCheckboxAttribute('リドル', ATTRIBUTE_TYPE.Like);
  const attrForCityLike = useCheckboxAttribute('シティ', ATTRIBUTE_TYPE.Like);
  const attrForClosedLike = useCheckboxAttribute('クローズド', ATTRIBUTE_TYPE.Like);
  const attrForSingleLike = useCheckboxAttribute('タイマン', ATTRIBUTE_TYPE.Like);
  const attrForKetudanLike = useCheckboxAttribute('決断を迫るシナリオ', ATTRIBUTE_TYPE.Like);
  const attrForR18Like = useCheckboxAttribute('R18', ATTRIBUTE_TYPE.Like);
  const attrForR18GLike = useCheckboxAttribute('R18-G', ATTRIBUTE_TYPE.Like);
  const attrForRihujinGLike = useCheckboxAttribute('理不尽好き', ATTRIBUTE_TYPE.Like);
  const attrForRihujinMine = useCheckboxAttribute('理不尽苦手', ATTRIBUTE_TYPE.Mine);
  const attrFor1PLLike = useCheckboxAttribute('１~2PL', ATTRIBUTE_TYPE.Like);
  const attrFor3PlLike = useCheckboxAttribute('3PL以上', ATTRIBUTE_TYPE.Like);
  const attrForHitokuHOLike = useCheckboxAttribute('秘匿HO', ATTRIBUTE_TYPE.Like);
  const attrForPvPScenarioLike = useCheckboxAttribute('PvPシナリオ', ATTRIBUTE_TYPE.Like);
  const attrForHightLostLike = useCheckboxAttribute('高ロスト', ATTRIBUTE_TYPE.Like);
  const attrForShorLike = useCheckboxAttribute('短編', ATTRIBUTE_TYPE.Like);
  const attrForMiddleLike = useCheckboxAttribute('中編', ATTRIBUTE_TYPE.Like);
  const attrForLongike = useCheckboxAttribute('長編', ATTRIBUTE_TYPE.Like);
  const attrForCampainLike = useCheckboxAttribute('キャンペーン', ATTRIBUTE_TYPE.Like);
  const attrForShortScenarioLike = useCheckboxAttribute(
    '3時間未満のシナリオ好き',
    ATTRIBUTE_TYPE.Like
  );
  const attrForLongtimeScenarioLike = useCheckboxAttribute(
    '3時間以上のシナリオ好き',
    ATTRIBUTE_TYPE.Like
  );

  const attrForFriendsLike = useCheckboxAttribute('友情', ATTRIBUTE_TYPE.Like);
  const attrForBadyLike = useCheckboxAttribute('バディ', ATTRIBUTE_TYPE.Like);
  const attrForLivalLike = useCheckboxAttribute('ライバル', ATTRIBUTE_TYPE.Like);
  const attrForLoveLike = useCheckboxAttribute('恋愛関係', ATTRIBUTE_TYPE.Like);
  const attrForKillLoveLike = useCheckboxAttribute('殺し愛', ATTRIBUTE_TYPE.Like);
  const attrForSishoDesiLike = useCheckboxAttribute('師匠と弟子', ATTRIBUTE_TYPE.Like);
  const attrForSenpaiKohaiLike = useCheckboxAttribute('先輩後輩', ATTRIBUTE_TYPE.Like);

  const attrForNLLike = useCheckboxAttribute('NL', ATTRIBUTE_TYPE.Like);
  const attrForGLLike = useCheckboxAttribute('GL', ATTRIBUTE_TYPE.Like);
  const attrForBLLike = useCheckboxAttribute('BL', ATTRIBUTE_TYPE.Like);
  const attrForLoveMine = useCheckboxAttribute('恋愛RP苦手', ATTRIBUTE_TYPE.Mine);

  const attrForBattleLike = useCheckboxAttribute('戦闘好き', ATTRIBUTE_TYPE.Like);
  const attrForDetectiveLike = useCheckboxAttribute('推理好き', ATTRIBUTE_TYPE.Like);
  const attrForConsiderationLike = useCheckboxAttribute('考察好き', ATTRIBUTE_TYPE.Like);
  const attrForEmoLike = useCheckboxAttribute('エモRP好き', ATTRIBUTE_TYPE.Like);
  const attrForTyabanLike = useCheckboxAttribute('茶番好き', ATTRIBUTE_TYPE.Like);
  const attrForHitokuLike = useCheckboxAttribute('秘匿好き', ATTRIBUTE_TYPE.Like);
  const attrForPvPLike = useCheckboxAttribute('PvP好き', ATTRIBUTE_TYPE.Like);
  const attrForUtuLike = useCheckboxAttribute('鬱展開歓迎', ATTRIBUTE_TYPE.Like);
  const attrForUtuMine = useCheckboxAttribute('鬱展開苦手', ATTRIBUTE_TYPE.Mine);
  const attrForLostLike = useCheckboxAttribute('ロスト歓迎', ATTRIBUTE_TYPE.Like);
  const attrForLostMine = useCheckboxAttribute('ロスト苦手', ATTRIBUTE_TYPE.Mine);
  const attrForTakumaeLike = useCheckboxAttribute('卓前すり合わせが好き', ATTRIBUTE_TYPE.Like);
  const attrForTakugoLike = useCheckboxAttribute('卓後感想戦が好き', ATTRIBUTE_TYPE.Like);
  const attrForKateiLike = useCheckboxAttribute('過程を楽しみたい', ATTRIBUTE_TYPE.RolePlayType);
  const attrForClearLike = useCheckboxAttribute(
    'ゲームクリアを目指したい',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForHodohodoLike = useCheckboxAttribute(
    'ロールプレイはほどほど',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForTappuriLike = useCheckboxAttribute(
    'ロールプレイを沢山したい',
    ATTRIBUTE_TYPE.RolePlayType
  );
  const attrForRuleMine = useCheckboxAttribute('ルール改変は苦手', ATTRIBUTE_TYPE.Mine);

  const attrForScenarioSkill = useCheckboxAttribute('シナリオ書けます', ATTRIBUTE_TYPE.SuperPower);
  const attrForIllustSkill = useCheckboxAttribute('イラスト描けます', ATTRIBUTE_TYPE.SuperPower);
  const attrForNovelSkill = useCheckboxAttribute('小説書けます', ATTRIBUTE_TYPE.SuperPower);
  const attrForRoomSkill = useCheckboxAttribute('部屋作りが得意', ATTRIBUTE_TYPE.SuperPower);
  const attrForHukaoriSkill = useCheckboxAttribute('PC背景深堀りが得意', ATTRIBUTE_TYPE.SuperPower);
  const attrForEngiSkill = useCheckboxAttribute('演技が得意', ATTRIBUTE_TYPE.SuperPower);
  const attrForKoemaneSkill = useCheckboxAttribute('声真似が得意', ATTRIBUTE_TYPE.SuperPower);

  const attrForPlayTimeMonday = useCheckboxAttribute('月曜日遊べます', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeTuesday = useCheckboxAttribute(
    '火曜日遊べます',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeWednesday = useCheckboxAttribute(
    '水曜日遊べます',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeThirsday = useCheckboxAttribute(
    '木曜日遊べます',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeFriday = useCheckboxAttribute('金曜日遊べます', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeSaturday = useCheckboxAttribute(
    '土曜日遊べます',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeSunday = useCheckboxAttribute('日曜日遊べます', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeNight = useCheckboxAttribute('夜遊べます', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeMidnight = useCheckboxAttribute('深夜遊べます', ATTRIBUTE_TYPE.PlayableTime);
  const attrForPlayTimeAfternonn = useCheckboxAttribute(
    '日中遊べます',
    ATTRIBUTE_TYPE.PlayableTime
  );
  const attrForPlayTimeFree = useCheckboxAttribute('基本暇です', ATTRIBUTE_TYPE.PlayableTime);

  return (
    <div>
      <AttributeCheck {...attrForNewly} />
      <h3>セッションスタイル</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForVoiceLike} />
        <AttributeCheck {...attrForTextLike} />
        <AttributeCheck {...attrForTextVoiceLike} />
        <AttributeCheck {...attrForOffLike} />
      </div>
      <h3>GM/PL傾向</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForPLLike} />
        <AttributeCheck {...attrForGMLike} />
      </div>

      <h3>好きなシナリオ傾向</h3>
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

      <h3>好きな関係性</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForFriendsLike} />
        <AttributeCheck {...attrForBadyLike} />
        <AttributeCheck {...attrForLivalLike} />
        <AttributeCheck {...attrForLoveLike} />
        <AttributeCheck {...attrForKillLoveLike} />
        <AttributeCheck {...attrForSishoDesiLike} />
        <AttributeCheck {...attrForSenpaiKohaiLike} />
      </div>
      <h3>恋愛RP傾向</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForNLLike} />
        <AttributeCheck {...attrForGLLike} />
        <AttributeCheck {...attrForBLLike} />
        <AttributeCheck {...attrForLoveMine} />
      </div>

      <h3>プレイ傾向</h3>
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
      <h3>スキル</h3>
      <div className="is-flex is-flex-wrap-wrap">
        <AttributeCheck {...attrForScenarioSkill} />
        <AttributeCheck {...attrForIllustSkill} />
        <AttributeCheck {...attrForNovelSkill} />
        <AttributeCheck {...attrForRoomSkill} />
        <AttributeCheck {...attrForHukaoriSkill} />
        <AttributeCheck {...attrForEngiSkill} />
        <AttributeCheck {...attrForKoemaneSkill} />
      </div>
      <h3>遊べる日程</h3>
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
        <summary>自由入力...</summary>
        <AttributeInputForm type={ATTRIBUTE_TYPE.Like} title="好き" userId={user.identifier} />
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
    </div>
  );
};
export default AttributesCheckCreateForm;
