import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAttributeEntity } from './domain/user/repository';
import { connect } from './store/actions/connect';
import { store } from '@/store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

initAttributeEntity(store.dispatch);
store.dispatch(connect());
