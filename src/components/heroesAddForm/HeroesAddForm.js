import { v4 as createID } from 'uuid';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, filtersFetching, filtersFetchingError } from '../../actions';
import { heroPost } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const {filters} = useSelector(state => state); // Вытягиваем два значения из state
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        element: '',
    })

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters", 'GET')
            .then(data => dispatch(filtersFetched(data))) // action 'FILTERS_FETCHED
            .catch(() => dispatch(filtersFetchingError())) // action 'FILTERS_FETCHING_ERROR'
    }, []);



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newHero = {id: createID(), ...formData}
        
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
        .then(res => console.log(res, 'Отправка успешна'))
        .then(dispatch(heroPost(newHero)))
        .catch(err => console.log(err));

        setFormData({ name: '', description: '', element: '' });
    };

    const elements = filters.map(({value, name, option}, i) => { 
        if (option) {
        return <option key={i} value={value}>{name}</option>}
    })

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={formData.name}
                    placeholder="Как меня зовут?"
                    onChange={handleInputChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    value={formData.description}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={handleInputChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={formData.element}
                    onChange={handleInputChange}>
                    <option value='not chosen'>Я владею элементом...</option>
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;