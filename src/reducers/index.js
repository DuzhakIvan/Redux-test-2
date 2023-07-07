const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    visualHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                visualHeroes: state.activeFilter === 'all' ? 
                              action.payload : 
                              action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE': { // Добавим функции при этом action
            let newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                visualHeroes: state.activeFilter === 'all' ? 
                              newHeroList : 
                              newHeroList.filter(item => item.element === state.activeFilter)
            } 
        }
        case 'HERO_POST': {
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                visualHeroes: state.activeFilter === 'all' ? 
                newCreatedHeroList : 
                newCreatedHeroList.filter(item => item.element === state.activeFilter)
            }
        }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload,
                visualHeroes: action.payload === 'all' ?
                              state.heroes : 
                              state.heroes.filter(item => item.element === action.payload)
            }

        default: return state
    }
}

export default reducer;