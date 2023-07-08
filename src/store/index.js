import { createStore, combineReducers, compose } from 'redux'; // Импортируем функцию по созданию Redux store, и функцию combine для обьединения reducers
import heroes from '../reducers/heroes'
import filters from '../reducers/filters';

const enhancer = (createStore) => (...args) => { // Создаем новую переменную, принимает createStore и возвращает новую функцию с аргументами
    const store = createStore(...args); // создаем store с переданными аргументами

    const oldDispatch = store.dispatch; // сохраняем оригинальный dispatch из store
    store.dispatch = (action) => { // меняем значение dispatch
        if (typeof action === 'string') { // если в action приходит строка
            return oldDispatch({ // запускаем старый dispatch
                type: action // и передаем обьект с типом и строкой декствия 
            })
        }
        return oldDispatch(action); // если не строка, то просто dispath action как по старому
    }

    return store; // возвращаем измененный store
}

const store = createStore( // Создаем store должны передать reducers
    combineReducers({heroes, filters}), //  в функцию combineReducer передается обьект с reducers, запись {heroes, filters} = {heroes: heroes, filters: filters}
    compose( // в функцию compose пиередаем все функции усилители, но необходимо соблюдать правильный порядок
        enhancer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // команда для работы плагина REDUX для браузера
    )); // Вторым аргументом в createStore функция она является усилителем store 

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // команда для работы плагина REDUX для браузера