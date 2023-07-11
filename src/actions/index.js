import {filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice'

export const fetchFilters = (request) => (dispatch) => { 
    dispatch(filtersFetching());
    request("http://localhost:3001/filters", 'GET')
        .then(data => dispatch(filtersFetched(data))) 
        .catch(() => dispatch(filtersFetchingError())) 
}

