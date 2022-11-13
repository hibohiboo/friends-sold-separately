import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { mswInit } from './domain/http/fetch';
import { initAttributeEntity as initFromPersistance } from './domain/user/repository';
import { connectServer } from './store/actions/dynamo';
import { store } from '@/store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

initFromPersistance(store.dispatch);
// TODO: MSWが設定されてから開発環境でfetchできるようにする
mswInit(() => {
  store.dispatch(connectServer());
});
