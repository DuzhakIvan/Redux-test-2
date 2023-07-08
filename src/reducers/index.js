const initialState = { // Создаем обьект состояний в redux store
    heroes: [], // Создаем массив из героев, сюда будем записывать все данные героев с сервера
    heroesLoadingStatus: 'idle', // состояние получения данных о героях с сервера, для отображения спиннера
    filters: [], // Создаем массив фильтров, сюда будем записывать фильтры полученные с сервера
    filtersLoadingStatus: 'idle', // состояние получения данных о фильтрах с сервера, для отображения спиннера
    activeFilter: 'all', // начльный параметр активного фильтра
}

const reducer = (state = initialState, action) => { // Создаем редюсер, в параметры записываем начанльные параметры стейт, а будем передавать новое состояние и действие над ним
    switch (action.type) { // Прописываем возвожные action
        case 'HEROES_FETCHING': // Запрос списка героев
            return {
                ...state, // записываем записываем остальные параметры state
                heroesLoadingStatus: 'loading' // изменяем только состояние загрузки героев на в состоянии loading
            }
        case 'HEROES_FETCHED': // Запрос завершен
            return {    
                ...state, // записываем остальные параметры state
                heroes: action.payload, // в массив героев записываем все входящие данные с сервера
                heroesLoadingStatus: 'idle' // возвращаем статус загрузки в исходное состояние
            }
        case 'HEROES_FETCHING_ERROR': // Действие получена ошибка
            return {
                ...state, // записываем остальные параметры state
                heroesLoadingStatus: 'error' // возвращаем статус загрузки в ошибку состояние
            }
        case 'HERO_DELETE': { // Добавим функции при этом action

            return {
                ...state, // записываем остальные параметры state
                heroes:state.heroes.filter(item => item.id !== action.payload) // записываем в текущий список новый список
            } 
        }
        case 'HERO_POST': { // Публикуем нового героя
            return {
                ...state, // записываем остальные параметры state
                heroes:[...state.heroes, action.payload] // список героев равен новому созданному списку с новым героем
            }
        }
        case 'FILTERS_FETCHING': // Запрос списка фильтров
            return {
                ...state, // записываем остальные параметры state
                filtersLoadingStatus: 'loading' // Переводим в статут loading
            }
        case 'FILTERS_FETCHED': // запрос списка фильтров завершен
            return { 
                ...state, // записываем остальные параметры state
                filters: action.payload, // фильтры равны переданным данныи из payload
                filtersLoadingStatus: 'idle' // переводим статус в начальный
            }
        case 'FILTERS_FETCHING_ERROR': // запрос к серверу по фильтрам завершился ошибой
            return {
                ...state, // сохроняем все параметры state по принципу иммутабельности
                filtersLoadingStatus: 'error' // переводим в статус ошибки
            }
        case 'ACTIVE_FILTER': // Текущий активный фильтр
            return {
                ...state, // сохраняем обьект неизменным
                activeFilter: action.payload // перезаписываем новый активный фильтр полученный из payload
            }

        default: return state // в случае неизвестного переданного действия возвращаем обьект state
    }
}

export default reducer;