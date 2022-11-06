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
  };
};
type AttributeType = 'RuleBook';
export type Attribute = {
  id: string;
  userId: string;
  createdAt: number;
  name: string;
  type: AttributeType;
};
export type AttributeEditForm = {
  name: string;
  type: AttributeType;
  userId: string;
};
