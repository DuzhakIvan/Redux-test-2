import { createStore } from 'redux'; // Импортируем функцию по созданию Redux store
import reducer from '../reducers';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // Создаем store

export default store;