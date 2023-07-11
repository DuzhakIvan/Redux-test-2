import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice' 
import filters from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

//middleware
const stringMiddleware = (store) => 
                         (next) => 
                         (action) => { 
    if (typeof action === 'string') { 
        return next({ 
            type: action
        })
    }
    return next(action); 
}

const store = configureStore({ 
    reducer: {heroes, 
                filters, 
                [apiSlice.reducerPath] : apiSlice.reducer}, // передаем reducer созданный RTK в store
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware), // и подключаем middleware RTK 
    // preloadedState: // оптциональный параметр для задания состояние начального хранилища
    devTools: process.env.NODE_ENV !== 'production', // Это переменная окружения в Node.js, если мы не в режиме production то ToolKit будет включено
    
})

export default store;