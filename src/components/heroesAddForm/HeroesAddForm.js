import { v4 as createID } from 'uuid'; // библиотека по генерации id
import { useState, useEffect } from 'react'; // Ипортируем хуки useState для создания состояния компонента, useEffect - для применения эффектов в определенный момент жизненного цикла
import { useDispatch, useSelector } from 'react-redux'; // импортируем хуки: useDispatch - для передачи нужного action в reducer, useSelector для получения доступа к олбьекту в store Redux
import { fetchFilters, heroPost } from '../../actions'; // импортируем необходимые actions
import { useHttp } from '../../hooks/http.hook'; // импортируем хук для связи с сервером

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => { // создаем функциональный компонент
    const {filters} = useSelector(state => state.filters); // Вытягиваем значения из обьекта reducer filters из  store Redux
    const dispatch = useDispatch(); // обьявляем функцию dispatch
    const {request} = useHttp(); // вытягиваем запрос

    const [formData, setFormData] = useState({ // Создаем состояние компонента с необходимыми данными для формы
        name: '',
        description: '',
        element: '',
    })

    useEffect(() => { // Вызываем хук для связи с сервером
        dispatch(fetchFilters(request)) // Благодаря использованию thunk redux мы смогли записать 3 action в одну функцию action
    }, []);



    const handleInputChange = (event) => { // создаем функцию на событие заполнения инпута формы
        const { name, value } = event.target; // вытягиваем из инпута DOM имя поля и введенное значение 
        setFormData({ ...formData, [name]: value }); // обновляем stage компонента
    };

    const handleSubmit = (event) => { // создаем функцию на событие отправки формы
        event.preventDefault(); // отменяем стандартные действия события 
        const newHero = {id: createID(), ...formData} // к сформированному обьекту state добавляем id с помощью функции из библиотеки
        
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero)) // Отправляем данные на сервер с помощью метода POST и предварительно конвертируем в формат json
        .then(res => console.log(res, 'Отправка успешна')) // В случае успешного ответа от сервера, выводим сообщение в консоль, так же эта команда не даст приступить к следующему действию при ошибке
        .then(dispatch(heroPost(newHero))) // отправляем в reducer с action с новым героем
        .catch(err => console.log(err)); // в случае ошибки, выводим в консоль ошибку

        setFormData({ name: '', description: '', element: '' }); // Очищаем state компонента
    };

    const elements = filters.map(({value, name, option}, i) => {  // создем элементы из массива фильтров из глобального store Redux, и методом map формируем новый массив 
        if (option) { // в случае если элемент содержит значение option
        return <option key={i} value={value}>{name}</option>} // возвращаем в массив тег option с параметрами 
        // key= равным индексу элемента, необходим для правильной работы перерисовки компонентов
        // value - значение option которое будет отправляться на сервер
        // name - отобращаемое для пользователя название option
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