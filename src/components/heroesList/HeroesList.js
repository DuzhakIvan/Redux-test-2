import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroesLoadingStatus, visualHeroes} = useSelector(state => state); // Вытягиваем два значения из state
    const dispatch = useDispatch();
    const {request} = useHttp(); // Получаем метод хука

    useEffect(() => {
        dispatch(heroesFetching()); // запускаем загрузку action 'HEROES_FETCHING'
        request("http://localhost:3001/heroes", 'GET')
            .then(data => dispatch(heroesFetched(data))) // action 'HEROES_FETCHED
            .catch(() => dispatch(heroesFetchingError())) // action 'HEROES_FETCHING_ERROR'

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDelete(id)))
            .catch(err => console.log(err));
    }, [request]);


    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition  timeout={0} classNames="hero"><h5 className="text-center mt-5">Героев пока нет</h5></CSSTransition>
        }

        return arr.map(({id, ...props}) => {
            return <CSSTransition key={id} id={id} timeout={500} classNames="hero" ><HeroesListItem  {...props} onDelete={() => onDelete(id)}/></CSSTransition>
        })
    }

    const elements = renderHeroesList(visualHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;