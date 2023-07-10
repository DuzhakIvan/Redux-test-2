// import { createStore, // Импортируем функцию по созданию Redux store,
//          combineReducers, // функцию combine для обьединения reducers
//          compose, // функцию compose для обьединения усилителей enhancer
//          applyMiddleware } // функция для обьединения middleware
        // from 'redux';  
// Теперь эти команды не используются благодаря Toolkit
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk' // импорнируем библиотеку middleware для возможности передачи функции в качестве action в reducer
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

// const store = createStore( // Создаем store должны передать reducers
//     combineReducers({heroes, filters}), //  в функцию combineReducer передается обьект с reducers, запись {heroes, filters} = {heroes: heroes, filters: filters}
   
//     compose( // в функцию compose пиередаем все функции усилители, но необходимо соблюдать правильный порядок
//         applyMiddleware(ReduxThunk, stringMiddleware), // педедаем Middleware но оборачиваем ее в функцию applyMiddleware
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // команда для работы плагина REDUX для браузера
//     )); // Вторым аргументом в createStore функция она является усилителем store 



const store = configureStore({ // создаем store с помощью configureStore(), внутрь передаем обьект с нужными параметрами
    reducer: {heroes, filters}, // уже не нужно использовать combineReducers, а просто записываем обьект
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware), // подключаем viddleware из ToolKit и добавляем в массив наш middleware
    // preloadedState: // оптциональный параметр для задания состояние начального хранилища
    devTools: process.env.NODE_ENV !== 'production', // Это переменная окружения в Node.js, если мы не в режиме production то ToolKit будет включено
    
})

export default store;