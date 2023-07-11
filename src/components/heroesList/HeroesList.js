import {useHttp} from '../../hooks/http.hook'; 
import { useEffect, useCallback, useMemo } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchHeroes, heroDelete, filterHeroesSelector } from './heroesSlice'; 
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [], // данные которые мы получили по запросу, по умолчанию сделаем его пустым
        isFetching, // запросы на сервер true
        isLoading, // впервый раз обращаемся к серверу
        isSuccess, // кода данные загружены
        isError, // ошибка при запросе
        error, // сама ошибка
        isUninitialized, // если true - запрос не отправлен еще
        refetch // сделать запрос в ручную
    } = useGetHeroesQuery(); // достаем готовые сущности из сгенерированного хука query

    const [deleteHero] = useDeleteHeroMutation(); // вытаскиваем функцию из мутации

    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredHeroes = useMemo (() => { 
        const filteredHeroes = heroes.slice(); // создаем копию массива для иммутабельности // метод slice() возвращает копию массива по указанным индексам от и до
        if (activeFilter === 'all') {
            return filteredHeroes;
        } else { 
            return filteredHeroes.filter(item => activeFilter === item.element) 
        }
    }, [heroes, activeFilter ])

    // const visualHeroes = useSelector(filterHeroesSelector);    

    // const {heroesLoadingStatus} = useSelector(state => state.heroes); 
    const dispatch = useDispatch();
    const {request} = useHttp(); 

    useEffect(() => {
        dispatch(fetchHeroes()); 
    } 
    ,[])

    const onDelete = useCallback((id) => { 

        deleteHero(id); // заменяем на функцию
        // request(`http://localhost:3001/heroes/${id}`, "DELETE") 
        //     .then(data => console.log(data, 'Deleted')) 
        //     .then(dispatch(heroDelete(id))) 
        //     .catch(err => console.log(err)); 
    }, [request]);


    if (isLoading) { 
        return <Spinner/>; 
    } else if (isError) { 
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> 
    }

    const renderHeroesList = (arr) => { 
        if (arr.length === 0) { // 
            return <CSSTransition  timeout={500} classNames="hero"><h5 className="text-center mt-5">Героев пока нет</h5></CSSTransition>
        }

        return arr.map(({id, ...props}) => { 
            return <CSSTransition key={id} id={id} timeout={500} classNames="hero" ><HeroesListItem  {...props} onDelete={() => onDelete(id)}/></CSSTransition> 
        })
    }

    const elements = renderHeroesList(filteredHeroes); 
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;