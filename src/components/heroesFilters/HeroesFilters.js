import { useDispatch, useSelector } from 'react-redux'; 
import { getActiveFilter } from './filtersSlice'; 
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => { 
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters); 
    const dispatch = useDispatch(); 

    if (filtersLoadingStatus === "loading") { 
        return <Spinner/>; 
    } else if (filtersLoadingStatus === "error") { 
        return <h5 className="text-center mt-5">Ошибка загрузки</h5> 
    }

    const renderFiltersButtons = (arr) => { 
        if (arr.length === 0) { 
            return <h5 className="text-center mt-5">Фильтров нет</h5> 
        }

        return arr.map(({name, className, value}, i) => { 
            let active = ''; 
            if (activeFilter === value) {
                active = 'active'; 
            }
            return <button 
                        key={i} 
                        value={value} 
                        onClick={() => dispatch(getActiveFilter(value))} 
                        className={`btn ${className} ${active}`}>
                            {name}
                    </button> 
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