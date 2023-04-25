import { loadedUdonariumRooms } from '@/store/actions/udonariumLily';
import { udonariumLilySlice } from '@/store/slices/udonariumLily';
import { udonariumLilyChatSlice } from '@/store/slices/udonariumLilyChat';
import { udonariumOrigin } from './const';
import { ChatMessagePayload } from './types';
import { AppStore } from '@/store';

export const listenFromInlineUdonarium = (store: AppStore) => {
  window.addEventListener(
    'message',
    (event: MessageEvent) => {
      if (event.origin !== udonariumOrigin) return;
      // event.data.type webpackOKのメッセージなども来る。

      if (event.data.type === 'open-connect')
        store.dispatch(udonariumLilySlice.actions.setUserId(event.data.payload));
      if (event.data.type === 'connect-peer')
        store.dispatch(udonariumLilySlice.actions.hidePeerArea());
      if (event.data.type === 'update-chat-message') {
        const payload = event.data.payload.context as ChatMessagePayload;
        store.dispatch(
          udonariumLilyChatSlice.actions.chatAdd({
            id: payload.identifier,
            text: payload.syncData.value,
            from: payload.syncData.attributes.from,
            name: payload.syncData.attributes.name,
            timestamp: payload.syncData.attributes.timestamp,
          })
        );
      }
      if (event.data.type === 'load-rooms') {
        store.dispatch(loadedUdonariumRooms(event.data.payload));
      }
    },
    false
  );
};
