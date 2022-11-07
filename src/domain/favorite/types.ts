import { AttributeType } from '../user/constants';
import { UserIdentifier } from '../user/types';

export type Favorite = FavoriteMessage & {
  createdAt: number;
};
export type FavoriteMessage = {
  id: string; // friendIdentifier_attributeId
  friendIdentifier: UserIdentifier;
  friendName: string;
  friendTwitterId: string;
  attributeId: string;
  attributeType: AttributeType;
  attributeName: string;
};
