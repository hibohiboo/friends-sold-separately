import { Attribute, PutUserContext } from './types';
import { RootState } from '@/store';

export const toPutUserContext = (state: RootState): PutUserContext => {
  return {
    profile: {
      userId: state.userProfile.identifier,
      twitterId: state.userProfile.twitterId,
      name: state.userProfile.name,
      isPublish: state.userProfile.isPublish,
      updatedAt: state.userProfile.updateAt,
    },
    attributes: Object.values(state.attributes.entities) as Attribute[],
  };
};
// in-source test suites
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('profileが既定の場所に入ること', () => {
    const state = {
      userProfile: {
        identifier: 'a',
        twitterId: 'b',
        name: 'c',
        isPublish: false,
        updateAt: 0,
      },
      attributes: {
        entities: {},
      },
    } as any;
    const ret = toPutUserContext(state);
    expect(ret).toEqual({
      profile: {
        userId: 'a',
        twitterId: 'b',
        name: 'c',
        isPublish: false,
        updatedAt: 0,
      },
      attributes: [],
    });
  });
}
