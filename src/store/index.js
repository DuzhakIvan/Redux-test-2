import { createStore, combineReducers } from 'redux'; // Импортируем функцию по созданию Redux store, и функцию combine для обьединения reducers
import heroes from '../reducers/heroes'
import filters from '../reducers/filters';

const store = createStore( // Создаем store должны передать reducers
    combineReducers({heroes, filters}), //  в функцию combineReducer передается обьект с reducers, запись {heroes, filters} = {heroes: heroes, filters: filters}
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // команда для работы плагина REDUX для браузера

export default store;