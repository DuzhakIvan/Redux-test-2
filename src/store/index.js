import { createStore, // Импортируем функцию по созданию Redux store,
         combineReducers, // функцию combine для обьединения reducers
         compose, // функцию compose для обьединения усилителей enhancer
         applyMiddleware } // функция для обьединения middleware
        from 'redux';  
import heroes from '../reducers/heroes'
import filters from '../reducers/filters';

//middleware
const stringMiddleware = (store) => // в store у нас доступно {dispatch, getState}, но мы сейчас не используем поэтому не дуструтуризируем и его можно даже не указывать в аргументе
                         (next) => // другая функция подхватывающая dispatch, пишем next потому что будет вызываться еще следующий middleware из цепочки
                         (action) => { // action и есть наш dispatch который возвращается в функционал
    if (typeof action === 'string') { // если в action приходит строка
        return next({ // запускаем старый dispatch
            type: action // и передаем обьект с типом и строкой декствия 
        })
    }
    return next(action); // если не строка, то просто dispath action как по старому
}

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
        applyMiddleware(stringMiddleware), // педедаем Middleware но оборачиваем ее в функцию applyMiddleware, чтобы была возможность подключать следуюшие middleware
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // команда для работы плагина REDUX для браузера
    )); // Вторым аргументом в createStore функция она является усилителем store 

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // команда для работы плагина REDUX для браузера