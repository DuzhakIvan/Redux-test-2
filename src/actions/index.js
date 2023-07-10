import { createAction } from "@reduxjs/toolkit";
import {heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice' // Пока импортируем сюда из slice
import {filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice' // Пока импортируем сюда из slice

export const fetchHeroes = (request) => (dispatch) => { // создадим комлексный actionCreator для получения героев и обработки состояний
    dispatch(heroesFetching()); // запускаем загрузку action 'HEROES_FETCHING' // теперь можем передавать функцию action напрямую - thunk работает
    request("http://localhost:3001/heroes", 'GET')
        .then(data => dispatch(heroesFetched(data))) // action 'HEROES_FETCHED
        .catch(() => dispatch(heroesFetchingError())) // action 'HEROES_FETCHING_ERROR'
}

// // export const heroesFetching = () => { // Действие запроса массива героев с сервера
// //     return {
// //         type: 'HEROES_FETCHING'
// //     }
// // }

// export const heroesFetching = createAction('HEROES_FETCHING'); // Применение createAction;

// // export const heroesFetched = (heroes) => { // Запрос завершен, у нас должен прийти массив с сервера
// //     return {
// //         type: 'HEROES_FETCHED',
// //         payload: heroes // записываем в payload
// //     }
// // }

// export const heroesFetched = createAction('HEROES_FETCHED'); // Не смотря на то, что мы не указываем payload, он автоматически передается.


// // export const heroesFetchingError = () => { // Запрос завершился ошибкой
// //     return {
// //         type: 'HEROES_FETCHING_ERROR'
// //     }
// // }

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// // Добавляем action на удаление из списка
// // То что будем передавать в reducer
// // export const heroDelete = (heroID) => { // Действие удаления персонажа по его ID
// //     return {
// //         type: 'HERO_DELETE',
// //         payload: heroID // ID героя для удаления
// //     }
// // }

// export const heroDelete = createAction('HERO_DELETE');

// // export const heroPost = (heroData) => { // Публикация нового персонажа, приходит обьект с героем с сервера
// //     return {
// //         type: 'HERO_POST',
// //         payload: heroData // обьект с героем
// //     }
// // }

// export const heroPost = createAction('HERO_POST');

export const fetchFilters = (request) => (dispatch) => { // создадим комлексный actionCreator для получения героев и обработки состояний
    dispatch(filtersFetching()); // запускаем загрузку action 'HEROES_FETCHING' // теперь можем передавать функцию action напрямую - thunk работает
    request("http://localhost:3001/filters", 'GET')
        .then(data => dispatch(filtersFetched(data))) // action 'HEROES_FETCHED
        .catch(() => dispatch(filtersFetchingError())) // action 'HEROES_FETCHING_ERROR'
}

// export const filtersFetching = () => { // Статус получения списка фильтров с сервера
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => { // Статус: фильтры получены с сервера, получает массив фильтров
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters // массив фильтров с сервера
//     }
// }

// export const filtersFetchingError = () => { // Запрос фильтров завершился ошибкой
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const getActiveFilter = (filter) => (dispatch) => { // Получение активного фильтра на данный момент // dispatch сам передается из thunk
//     setTimeout(() => { // Добавляем таймер
//         dispatch({ // запускаем dispatch из возвращаемой функции thunk
//             type: 'ACTIVE_FILTER',
//             payload: filter // Передаем новый активный фильтр
//         })
//     }, 1000) // ставим задержку в 1 сек
// }

// export const getActiveFilter = (filter) => { // Получение активного фильтра на данный момент // dispatch сам передается из thunk
//     return { 
//         type: 'ACTIVE_FILTER',
//         payload: filter // Передаем новый активный фильтр
//     }

// }
