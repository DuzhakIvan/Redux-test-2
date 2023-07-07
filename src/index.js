import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

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

// {
//   "id": 1,
//   "name": "Первый герой",
//   "description": "Первый герой в рейтинге",
//   "element": "fire"
// },
// {
//   "id": 2,
//   "name": "Неизвестный герой",
//   "description": "Скрывающийся в тени",
//   "element": "wind"
// },
// {
//   "id": 3,
//   "name": "Морской герой",
//   "description": "Как аквамен, но не из DC",
//   "element": "water"
// },
// {
//   "id": 4,
//   "name": "Дерьмодемон",
//   "description": "Приходит неожиданно",
//   "element": "earth"
// }