const initialState = { // Создаем обьект состояний в redux store
    filters: [], // Создаем массив фильтров, сюда будем записывать фильтры полученные с сервера
    filtersLoadingStatus: 'idle', // состояние получения данных о фильтрах с сервера, для отображения спиннера
    activeFilter: 'all', // начльный параметр активного фильтра
}

const filters = (state = initialState, action) => { // Создаем редюсер, в параметры записываем начанльные параметры стейт, а будем передавать новое состояние и действие над ним
    switch (action.type) { // Прописываем возвожные action
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

export default filters;