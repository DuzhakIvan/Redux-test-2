export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

// Добавляем action на удаление из списка
// То что будем передавать в reducer
export const heroDelete = (heroID) => { // Check
    return {
        type: 'HERO_DELETE',
        payload: heroID
    }
}

export const heroPost = (heroData) => { // Check
    return {
        type: 'HERO_POST',
        payload: heroData
    }
}

export const filtersFetching = () => { // Check
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => { // Check
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => { // Check
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const getActiveFilter = (filter) => {
    return {
        type: 'ACTIVE_FILTER',
        payload: filter
    }
}
