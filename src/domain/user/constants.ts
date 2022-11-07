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
} as const;
export type AttributeType = typeof ATTRIBUTE_TYPE[keyof typeof ATTRIBUTE_TYPE];
