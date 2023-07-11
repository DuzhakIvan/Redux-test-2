import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook'


const initialState = { 
    heroes: [], 
    heroesLoadingStatus: 'idle',
}

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
            state.heroes.push(action.payload); 
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload})
            .addCase(fetchHeroes.rejected, state => {  state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
                
    }
});

const {actions, reducer} = heroesSlice; 

export default reducer; 
export const { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroPost,
    heroDelete
} = actions;