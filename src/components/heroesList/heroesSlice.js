import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook'

const heroesAdapter = createEntityAdapter(); // вызов этой функции создаст готовый обьект с методами, callback, мемоизированными селекторами (позволяют вытаскивать определенные сущности изи стора)

const initialState = heroesAdapter.getInitialState({ // метод Адаптера создающий начальное состояние обьект (id[], entities{}, {...args})
    heroesLoadingStatus: 'idle' // дополнительное свойство state
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes', // прописываем имя_среза/тип_action
    () => { // функция которая должна вернуть promise, (arg, thunkAPI) у thunkAPI куча методотов
        const {request} = useHttp();
        return request("http://localhost:3001/heroes", 'GET') // обязательно нужно вернуть promise, поэтому пишем return, можно не писать async await, так как в useHttp он прописан уже
    }
)

const heroesSlice = createSlice({
    name: 'heroes', 
    initialState, 
    reducers: { 
        heroPost: (state, action) => {
            heroesAdapter.addOne(state, action.payload); 
        },
        heroDelete: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {  state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
                
    }
});

const {actions, reducer} = heroesSlice; 

export default reducer; 

const {selectAll } = heroesAdapter.getSelectors(state => state.heroes); // Вытаскиваем селекторы из Адаптера с четкой привязкой к обьекту heroes

export const filterHeroesSelector = createSelector(  // Перенесли функцию из компонента
    (state) => state.filters.activeFilter, 
    // (state) => state.heroes.heroes,
    selectAll, // Замена верхней функции
    (activeFilter, heroes) => { // в heroes передастся второй аргумент - результат функции selectAll - массив сформированный методом selectAll
        if (activeFilter === 'all') {
            return heroes;
        } else { 
            return heroes.filter(item => activeFilter === item.element) 
        }
    }
)

export const { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroPost,
    heroDelete
} = actions;