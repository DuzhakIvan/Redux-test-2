import { createSlice } from "@reduxjs/toolkit";

// function createSlice({
//     // A name, used in action types
//     name: string, // Имя среза, пространства имен actions

//     initialState: any, // начальное состояние

//     reducers: Object<string, ReducerFunction | ReducerAndPrepareObject> // обьект с обработчиками

//     extraReducers?: // обьект другого среза
//     | Object<string, ReducerFunction>
//     | ((builder: ActionReducerMapBuilder<State>) => void)
// })

const initialState = { // Создаем обьект состояний в redux store
    heroes: [], // Создаем массив из героев, сюда будем записывать все данные героев с сервера
    heroesLoadingStatus: 'idle', // состояние получения данных о героях с сервера, для отображения спиннера
}

const heroesSlice = createSlice({
    name: 'heroes', // пространство имен, название среза. В зависимости от этого будет формироваться название state.heroes
    initialState, // начальное состояние
    reducers: { // Чтобы создать какие то дейсвтвия пишем пространство имен heroes и потом тип действия : и функционал после действия
        // автоматически генерируются action creators и под них reducer
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'}, // тут все так же работает immer для соблюдения имутабельности
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload},
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error'
        },
        heroPost: (state, action) => {
            state.heroes.push(action.payload); 
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    }
    // extraReducers мы не задаем
});

const {actions, reducer} = heroesSlice; // Slice возвращает обьект с действиями и редьюсером, который мы можем деструктуризировать

export default reducer; // экспортируем редьюсер
export const { // деструктуризируем и экспортируем экшены
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroPost,
    heroDelete
} = actions;