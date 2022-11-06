export type UserContext = {
  identifier: string;
  aliasName: string;
  majorVersion: number;
  minorVersion: number;
  syncData: {
    userId: string;
    peerId: string;
    name: string;
    isPublish: boolean;
    attributes: Attribute[];
  };
};
type AttributeType = 'RuleBook';
export type Attribute = {
  id: string;
  userIdentifier: string;
  createdAt: number;
  name: string;
  type: AttributeType;
};
export type AttributeEditForm = {
  name: string;
  type: AttributeType;
  userIdentifier: string;
};
