import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDelete,
    heroPost
} from '../actions';

const initialState = { // Создаем обьект состояний в redux store
    heroes: [], // Создаем массив из героев, сюда будем записывать все данные героев с сервера
    heroesLoadingStatus: 'idle', // состояние получения данных о героях с сервера, для отображения спиннера
}

// // Вариант только для native JS
// const heroes = createReducer(initialState, {
//     [heroesFetching] : state => { state.heroesLoadingStatus = 'loading';}, // Пользуемся возможностью ES6 динамически создавать ключи [heroesFetching]
//     [heroesFetched] : (state, action) => {
//                         state.heroesLoadingStatus = 'idle';
//                         state.heroes = action.payload
//     },
//     [heroesFetchingError] : state => {
//         state.heroesLoadingStatus = 'error'
//     },
//     [heroPost] : (state, action) => {
//         state.heroes.push(action.payload); // благодаря тому, что нам не нужно соблюдать иммутабельность мы можем просто запушить новые данные
//     },
//     [heroDelete]: (state, action) => {
//         state.heroes = state.heroes.filter(item => item.id !== action.payload);
//     },
// },
//     [], // Массив функций сравнения
//     state => state // Default case функция, получаем state  в аргумент и просто его возвращаем 
// )

// Вариант через builder работает везде
const heroes = createReducer(initialState, // вызываем функцию создания reducer, первым аргументом передаем начальное состояние
     builder => { // вторым аргументом будет функция под названием builder, обьект который позволяет с помощью встроенных методотов формируем reducer
    builder
        .addCase(heroesFetching, state => { // встроенный метод case(actionCreator, функция (state, action) по изменению state), тут срабатывает библиотека immer, которая упрощает и сохраняет иммутабельность
            state.heroesLoadingStatus = 'loading'; // благодаря immer можно писать неиммутабельный код, он автоматически трансформируется в нужный
        }) // если мы поместим return или напишем в одну строчку - immer не сработает, так как будет думать что мы уже позаботились о иммутабельности
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroPost, (state, action) => {
            state.heroes.push(action.payload); // благодаря тому, что нам не нужно соблюдать иммутабельность мы можем просто запушить новые данные
        })
        .addCase(heroDelete, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {}) // метод для дефолтного случая, обычно просто возвращают пустой обьект
})



// const heroes = (state = initialState, action) => { // Создаем редюсер, в параметры записываем начанльные параметры стейт, а будем передавать новое состояние и действие над ним
//     switch (action.type) { // Прописываем возвожные action
//         case 'HEROES_FETCHING': // Запрос списка героев
//             return {
//                 ...state, // записываем записываем остальные параметры state
//                 heroesLoadingStatus: 'loading' // изменяем только состояние загрузки героев на в состоянии loading
//             }
//         case 'HEROES_FETCHED': // Запрос завершен
//             return {    
//                 ...state, // записываем остальные параметры state
//                 heroes: action.payload, // в массив героев записываем все входящие данные с сервера
//                 heroesLoadingStatus: 'idle' // возвращаем статус загрузки в исходное состояние
//             }
//         case 'HEROES_FETCHING_ERROR': // Действие получена ошибка
//             return {
//                 ...state, // записываем остальные параметры state
//                 heroesLoadingStatus: 'error' // возвращаем статус загрузки в ошибку состояние
//             }
//         case 'HERO_DELETE': { // Добавим функции при этом action

//             return {
//                 ...state, // записываем остальные параметры state
//                 heroes:state.heroes.filter(item => item.id !== action.payload) // записываем в текущий список новый список
//             } 
//         }
//         case 'HERO_POST': { // Публикуем нового героя
//             return {
//                 ...state, // записываем остальные параметры state
//                 heroes:[...state.heroes, action.payload] // список героев равен новому созданному списку с новым героем
//             }
//         }

//         default: return state // в случае неизвестного переданного действия возвращаем обьект state
//     }
// }

export default heroes;