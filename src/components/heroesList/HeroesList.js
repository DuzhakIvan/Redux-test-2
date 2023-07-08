import {useHttp} from '../../hooks/http.hook'; // импортируем созданный хук для связи с сервером
import { useEffect, useCallback } from 'react'; // импортируем хуки: useEffect для вызывания побочныъ эффектов в определенном жизненном цикле, useCallback для мемоизации результата функции
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    const filterHeroesSelector = useCallback(createSelector( // Получим функцию селектора
        (state) => state.filters.activeFilter, // Результат первой функции значение активного фильтра из store Redux reducer filters
        (state) => state.heroes.heroes, // Результат второй функции значение списка героев из store Redux reducer heroes
        (activeFilter, heroes) => {
            if (activeFilter === 'all') { // если активный фильтр all, обращаемся к reducer фильтров ик его свойству
                console.log('render'); // Будет вызываться не смотря на то, что значения в reducer не будут изменяться...
                return heroes; // возвращаем из state.heroes reducer весь массив с героями, 
            } else { // или
                return heroes.filter(item => activeFilter === item.element) // возвращаем отфлитрованный массив в зависимости от фильтра
            }
        }
    ), [])
    
    const visualHeroes = useSelector(filterHeroesSelector);    

    // Из за проблемы мемоизации данных эта функция не оптимизирована
    // const visualHeroes = useSelector(state => { // Чтобы избавиться от зависимостей в reducer, прописываем условия прямо в useSelector
    //     if (state.filters.activeFilter === 'all') { // если активный фильтр all, обращаемся к reducer фильтров ик его свойству
    //         console.log('render'); // Будет вызываться не смотря на то, что значения в reducer не будут изменяться...
    //         return state.heroes.heroes; // возвращаем из state.heroes reducer весь массив с героями, 
    //     } else { // или
    //         return state.heroes.heroes.filter(item => state.filters.activeFilter === item.element) // возвращаем отфлитрованный массив в зависимости от фильтра
    //     }
    // }) // Благодаря описанию логики здесь, на уже не нужны переменные visualHeroes в reducer и зависимости прописанные там, а так же разделили редьюсеры по логике

    const {heroesLoadingStatus} = useSelector(state => state); // Вытягиваем два значения из state
    const dispatch = useDispatch();
    const {request} = useHttp(); // Получаем метод хука

    useEffect(() => {
        dispatch(heroesFetching()); // запускаем загрузку action 'HEROES_FETCHING'
        request("http://localhost:3001/heroes", 'GET')
            .then(data => dispatch(heroesFetched(data))) // action 'HEROES_FETCHED
            .catch(() => dispatch(heroesFetchingError())) // action 'HEROES_FETCHING_ERROR'

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => { // Используем useCallback для сохранения ссылки на данную функцию, при ререндере компонента ссылка на функцию останется.
        request(`http://localhost:3001/heroes/${id}`, "DELETE") // Делаем запрос на сервер с методом DELETE на конкретный обьект героев с указанным id, благодаря библиотеке json-server
            .then(data => console.log(data, 'Deleted')) // в промисе получаем пустую дату {}, так как по этому адрессу у нас уже удаленный пустой обьект
            .then(dispatch(heroDelete(id))) // теперь передаем action по удалению героя с указанным id в reducer
            .catch(err => console.log(err)); // в случае ошибки вывести обьект ошибки
    }, [request]);


    if (heroesLoadingStatus === "loading") { // Создаем условие, если статус загрузки героев loading
        return <Spinner/>; // возвращаем компонент Spinner
    } else if (heroesLoadingStatus === "error") { // если статус ошибка
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> // возвращаем заголовок с текстом
    }

    const renderHeroesList = (arr) => { // Пишем функцию по созданию списка героев
        if (arr.length === 0) { // если массив равен нулю
            return <CSSTransition  timeout={500} classNames="hero"><h5 className="text-center mt-5">Героев пока нет</h5></CSSTransition> // возвращаем заголовок с текстом, обернуто в компонент анимации
        }

        return arr.map(({id, ...props}) => { // формируем новый массив н основании полученного массива, деструктуризируем из кждого элемента массива его id и остальные пропсы
            return <CSSTransition key={id} id={id} timeout={500} classNames="hero" ><HeroesListItem  {...props} onDelete={() => onDelete(id)}/></CSSTransition> // возвраащаем в новый массив элемент списка с id элемента и другими пропсам, а так же в пропсах передаем функцию onDelete с id элемента
        })
    }

    const elements = renderHeroesList(visualHeroes); // вызываем функцию по формированию списка героев из массива visualHero, который хранится в store Redux
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
} // Оборачиваем в TransitGroup, но в ДОМ он будет как ul
    // и разворачиваем массив elements со списком героев

export default HeroesList;