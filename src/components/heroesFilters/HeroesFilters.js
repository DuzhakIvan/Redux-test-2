import { useDispatch, useSelector } from 'react-redux'; // импортируем хуки  useDispatch для передачи action в reducer, useSelector для использования state из store Redux
import { getActiveFilter } from '../../actions'; // импортируем action
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => { // создаем компонент фильтров
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters); // Берем состояния списка фильтров, статуса загрузки, активный фильтр из reducer filters
    const dispatch = useDispatch(); // создаем функцию по передаче в reducer

    if (filtersLoadingStatus === "loading") { // Создаем условие, если статус = загрузка
        return <Spinner/>; // возвращаем spinner
    } else if (filtersLoadingStatus === "error") { // если статус = ошибке
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> // возвращаем заголовок с текстом, класс bootstrap tex--aligin: center; margin-top: 5px;
    }

    const renderFiltersButtons = (arr) => { // создаем функцию для рендера кнопок фильтров, передаем массив
        if (arr.length === 0) { // если длина массива равна 0
            return <h5 className="text-center mt-5">Фильтров нет</h5> // возвращаем заголовок с текстом
        }

        return arr.map(({name, className, value}, i) => { // возвращаем новый массив, но перед этим каждый элемент из старого массива изменим
            let active = ''; // обьявляем переменную, которая будет отвечать активный ли фильтр
            if (activeFilter === value) { // если состояние активного фильтра равно значению элементу массива
                active = 'active'; // ставим активный
            }
            return <button // возвращаем кнопку в массив
                        key={i} // с ключем равным индексу элемента
                        value={value} // атрибутом value
                        onClick={() => dispatch(getActiveFilter(value))} // вешаем на каждую кнопку событие клика, при клике отправляется value кнопки в reducer для смены активного фильтра
                        className={`btn ${className} ${active}`}>
                            {name}
                    </button> // в класс записываем данные с сервера для кадой кнопки и в зависимости от условия  будет ставиться active или нет, btn - добавляет стандартные стили кнопки в bootstrap
        })
    }

 
    const elements = renderFiltersButtons(filters); // Присваивем переменной значение списка кнопок из модифицированного массива фильтров

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;