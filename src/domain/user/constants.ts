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
