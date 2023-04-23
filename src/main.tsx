import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { basePath } from './constants';
import { sendToGoogleAnalytics } from './domain/firebase';
import { listenFromInlineUdonarium } from './domain/udonarium/listener';
import { initAttributeEntity as initFromPersistance } from './domain/user/repository';
import { mswInit } from './mock/msw';
import reportWebVitals from './reportWebVitals';
import RoutesApp from './router/RoutesApp';
import { connectServer } from './store/actions/dynamo';
import { store } from '@/store';

import './index.scss';

mswInit().then(() => store.dispatch(connectServer()));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={basePath}>
    <Provider store={store}>
      <React.StrictMode>
        <RoutesApp />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);

initFromPersistance(store.dispatch);
listenFromInlineUdonarium(store.dispatch);
// 開発環境ではログに。本番環境ではグーグル アナリティクスに出力。
const isDevevelopServe = import.meta.env.MODE === 'development'; // import.meta.env.DEV

const reportTo = isDevevelopServe ? console.log : sendToGoogleAnalytics;

reportWebVitals(reportTo);
