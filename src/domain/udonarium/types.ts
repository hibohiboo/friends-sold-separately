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

export type ChatMessagePayload = {
  aliasName: 'chat';
  identifier: string;
  majorVersion: number;
  minorVersion: number;
  syncData: {
    value: string; // チャット内容
    parentIdentifier: string; // タブのidentifier ... 例: MainTab
    majorIndex: number;
    minorIndex: number;
    attributes: {
      fixd: boolean;
      from: string; // userId
      imageIdentifier: string;
      messColor: string; // #ffffff
      name: string;
      sendFrom: string;
      tag: string; // ex. DiceBot
      timestamp: number;
    };
  };
};
export type ChatMessage = {
  id: string; // context.identifier
  text: string; // syncData.value
  from: string; // syncData.attributes.from
  name: string; // syncData.attributes.name
  timestamp: number; // syncData.attributes.timestamp
};
