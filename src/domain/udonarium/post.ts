import { Message, PostMessageEventType } from './types';

const origin = 'http://localhost:4200';
export const postUdonariumMessage = (payload: any, type: PostMessageEventType) => {
  const target = document.getElementById('iframe-udonarium') as HTMLIFrameElement;
  if (!target || !target.contentWindow) return;
  const message: Message = {
    type,
    payload,
  };
  target.contentWindow.postMessage(message, origin);
};
