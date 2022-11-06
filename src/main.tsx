import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { connect } from '@/store/actions/connect';
import App from './App';
import { store } from '@/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

store.dispatch(connect());
