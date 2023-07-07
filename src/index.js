import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Компонент выполняет роль обертки вокруг приложения, предоставляя контекст, через который компоненты могут получать доступ к состоянию Redux и действиям.

import App from './components/app/App';
import store from './store';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);