export const heroesFetching = () => { // Действие запроса массива героев с сервера
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => { // Запрос завершен, у нас должен прийти массив с сервера
    return {
        type: 'HEROES_FETCHED',
        payload: heroes // записываем в payload
    }
}

export const heroesFetchingError = () => { // Запрос завершился ошибкой
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

// Добавляем action на удаление из списка
// То что будем передавать в reducer
export const heroDelete = (heroID) => { // Действие удаления персонажа по его ID
    return {
        type: 'HERO_DELETE',
        payload: heroID // ID героя для удаления
    }
}

export const heroPost = (heroData) => { // Публикация нового персонажа, приходит обьект с героем с сервера
    return {
        type: 'HERO_POST',
        payload: heroData // обьект с героем
    }
}

export const filtersFetching = () => { // Статус получения списка фильтров с сервера
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => { // Статус: фильтры получены с сервера, получает массив фильтров
    return {
        type: 'FILTERS_FETCHED',
        payload: filters // массив фильтров с сервера
    }
}

export const filtersFetchingError = () => { // Запрос фильтров завершился ошибкой
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const getActiveFilter = (filter) => { // Получение активного фильтра на данный момент
    return {
        type: 'ACTIVE_FILTER',
        payload: filter // Передаем новый активный фильтр
    }
}
