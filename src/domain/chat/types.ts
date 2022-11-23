import { TimeStamp } from '../firebase/types';

export type ChatMessage = {
  uid: string;
  identifier: string;
  twitterId?: string;
  name: string;
  isPublish: boolean;
  isNewly: boolean;
  text: string;
  createdAt: TimeStamp;
  updatedAt: number;
};
