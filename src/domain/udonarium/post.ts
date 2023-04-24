import { udonariumOrigin } from './const';
import { Message, PostMessageEventType } from './types';

export const postUdonariumMessage = (payload: any, type: PostMessageEventType) => {
  const target = document.getElementById('iframe-udonarium') as HTMLIFrameElement;
  if (!target || !target.contentWindow) return;
  const message: Message = {
    type,
    payload,
  };
  target.contentWindow.postMessage(message, udonariumOrigin);
};
