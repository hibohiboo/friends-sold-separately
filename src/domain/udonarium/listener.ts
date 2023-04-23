import { Dispatch } from '@reduxjs/toolkit';
import { udonariumLilySlice } from '@/store/slices/udonariumLily';

export const listenFromInlineUdonarium = (dispatch: Dispatch) => {
  window.addEventListener(
    'message',
    (event: MessageEvent) => {
      console.log('receive event', event);
      if (event.origin !== 'http://localhost:4200') return;
      // event.data.type webpackOKのメッセージなども来る。
      console.log('parent test', event);
      dispatch(udonariumLilySlice.actions.setUserId(event.data.payload));
    },
    false
  );
};
