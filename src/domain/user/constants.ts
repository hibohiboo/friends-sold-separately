import { API_BASE_PATH } from '@/domain/http/constants';

export const ATTRIBUTE_TYPE = {
  Rulebook: 'Rulebook',
  Newly: 'Newly',
  WantToPlay: 'WantToPlay',
  FunScenario: 'FunScenario',
  Mine: 'Mine',
  PlayableTime: 'PlayableTime',
  SuperPower: 'SuperPower',
  Like: 'Like',
  RolePlayType: 'RolePlayType',
  FavoriteReply: 'FavoriteReply',
} as const;
export type AttributeType = typeof ATTRIBUTE_TYPE[keyof typeof ATTRIBUTE_TYPE];
export const GYUTTO_HAND_USER_PATH = 'gyutto-hand-user';
export const GYUTTO_HAND_USER_FULL_PATH = `${API_BASE_PATH}${GYUTTO_HAND_USER_PATH}`;
export const ATTRIBUTE_ORDER = {
  Newly: 0,
  Like: 1,
  RolePlayType: 2,
  SuperPower: 3,
  Mine: 4,
  Rulebook: 5,
  PlayableTime: 6,
  WantToPlay: 7,
  FunScenario: 8,
  FavoriteReply: 9,
} as const;

export const ATTRIBUTE_TITLE = {
  Rulebook: '遊びたいシステム',
  Newly: '初心者',
  WantToPlay: '遊びたいシナリオ',
  FunScenario: '楽しかったシナリオ',
  Mine: '苦手。地雷。好きな人はごめん。',
  PlayableTime: '遊べる時間',
  SuperPower: 'スキル',
  Like: '好き',
  RolePlayType: 'ロールプレイ傾向',
  FavoriteReply: '好きなリプレイ',
} as const;
