import { useCallback } from "react"; // импортируем хук useCallback для мемоизации функции

export const useHttp = () => { // создаем и сразу экспортируем хук 
    // const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => { // создаем функцию для запроса на сервер

        // setProcess('loading');

        try { // пробуем 
            const response = await fetch(url, {method, body, headers}); // дождись ответа от сервера по заданному адресу, методу, телу и заголовам

            if (!response.ok) { // если статус ответка НЕ ok
                throw new Error(`Could not fetch ${url}, status: ${response.status}`); // выкинь ошибку с адрессом запроса и статусом ошибки 
            }

            const data = await response.json(); // если все ок, то запиши в дату дождавшись ответа от сервера, результат запроса

            return data; // результат функции data
        } catch(e) { // если будет ошибка, выкинь ее
            // setProcess('error');
            throw e;
        }
    }, []); // Ссылка на эту функцию создаться один раз при монтировании создасться
    
    // const clearError = useCallback(() => {
        // setProcess('loading');
    // }, []);

    return {request, 
            // clearError, 
            // process, 
            // setProcess
        }
}