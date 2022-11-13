import { AttributeType } from './constants';

export type UserIdentifier = string;
export type UserContext = {
  identifier: UserIdentifier;
  aliasName: string;
  majorVersion: number;
  minorVersion: number;
  syncData: {
    userId: string;
    peerId: string;
    name: string;
    twitterId: string;
    isPublish: boolean;
    attributes: Attribute[];
  };
};

type AttributeId = string;
export type Attribute = {
  id: AttributeId;
  userIdentifier: UserIdentifier;
  createdAt: number;
  name: string;
  type: AttributeType;
};

export type AttributeEditForm = {
  name: string;
  type: AttributeType;
  userIdentifier: UserIdentifier;
};
export type FriendAttribute = Attribute & { isFavorite: boolean; isSelf: boolean };
export type Friend = {
  userIdentifier: UserIdentifier;
  peerId: string;
  name: string;
  twitterId: string;
  attributes: FriendAttribute[];
};

export type MyFavorite = {
  id: AttributeId;
  userIdentifier: UserIdentifier;
  userName: string;
  type: AttributeType;
  name: string;
  twitterId: string;
};

export type PutUserContext = {
  profile: {
    userId: UserIdentifier;
    name: string;
    twitterId: string;
    isPublish: boolean;
  };
  attributes: Attribute[];
};
