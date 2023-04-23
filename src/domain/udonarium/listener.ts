import { udonariumLilySlice } from '@/store/slices/udonariumLily';
import { AppStore } from '@/store';

export const listenFromInlineUdonarium = (store: AppStore) => {
  window.addEventListener(
    'message',
    (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:4200') return;
      // event.data.type webpackOKのメッセージなども来る。

      if (event.data.type === 'open-connect')
        store.dispatch(udonariumLilySlice.actions.setUserId(event.data.payload));
      if (event.data.type === 'connect-peer')
        store.dispatch(udonariumLilySlice.actions.hidePeerArea());
    },
    false
  );
};
