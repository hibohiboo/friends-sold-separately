interface ChatMessageContext {
  identifier?: string;
  tabIdentifier?: string;
  originFrom?: string;
  from?: string;
  to?: string;
  name?: string;
  text?: string;
  timestamp?: number;
  tag?: string; // game type
  dicebot?: string;
  imageIdentifier?: string;

  imagePos?: number;
  messColor?: string;
  sendFrom?: string; // lily
}

interface PostMessageData<T> {
  payload: T;
  type: 'chat' | 'dice';
}
type PostMessageChat = PostMessageData<{
  message: ChatMessageContext;
  tab: string;
}>;
export type PostMessageEventType =
  | 'change-player-name'
  | 'connect-by-target-user-id'
  | 'send-chat-message';
export type Message = {
  type: PostMessageEventType;
  payload: any;
};
