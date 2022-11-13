import { Attribute, PutUserContext } from './types';
import { RootState } from '@/store';

export const toPutUserContext = (state: RootState): PutUserContext => {
  return {
    profile: {
      userId: state.userProfile.identifier,
      twitterId: state.userProfile.twitterId,
      name: state.userProfile.name,
      isPublish: state.userProfile.isPublish,
    },
    attributes: Object.values(state.attributes.entities) as Attribute[],
  };
};
