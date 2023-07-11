import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// создаем функциональность для работы с сервером напрямую
export const apiSlice = createApi({ // автоматически генерирует хуки на каждое действие и создает reducer 'api'
    reducerPath: 'api', // название reducer
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),           // вместо обычного fetch, указываем адрес сервера с данными
    tagTypes: ['Heroes'], // обозначаем какие метки тэги существуют в нашем api
    endpoints: builder => ({// принимает функцию, операции по базовому адресу получение, изменение, удаление
        getHeroes: builder.query({ // запрос на сервер
            query: () => '/heroes',
            providesTags: ['Heroes'] // когда происходит метод запроса, ставится метка 'Heroes'
        }),
        createHero: builder.mutation({ // эндпоинт мутация данных на сервере
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero // когда мы передаем сюда параметр он автоматически будет превращен в json формат
            }),
            invalidatesTags: ['Heroes'] // если срабатывает мутация, то по этой метке мы получим актуальные данные
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    }),
});

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice; // названия генерируются автоматически начинаются с use_"Наше название"_method