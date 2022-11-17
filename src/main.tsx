import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { mswInit } from './domain/http/fetch';
import { initAttributeEntity as initFromPersistance } from './domain/user/repository';
import RoutesApp from './router/RoutesApp';
import { connectServer } from './store/actions/dynamo';
import { store } from '@/store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename="friends-shakehand">
    <Provider store={store}>
      <React.StrictMode>
        <RoutesApp />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);

initFromPersistance(store.dispatch);
// TODO: MSWが設定されてから開発環境でfetchできるようにする
mswInit(() => {
  store.dispatch(connectServer());
});
