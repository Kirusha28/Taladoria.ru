import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import { setUser } from '../../store/slices/accountData';
import { mainApi } from './../../store/services/mainApi';

const DiscordCallback = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    // RTK Query сам выполнит запрос, как только появится code
    // skip: !code предотвращает запрос, если кода нет в URL
    const { data, error, isLoading } = mainApi.useDiscordLoginQuery(code, {
        skip: !code,
    });

    useEffect(() => {
        if (data) {
            if (data.token) {
                // Сохраняем токен в куки
                // console.log(data.token)
                Cookies.set('token', data.token, { expires: 7, secure: false });
                // console.log(Cookies.get('token'))
                // Обновляем данные пользователя в Redux
                dispatch(setUser({...data.user, loggedIn: true}));
                
                console.log('Авторизация через RTK Query успешна');
                navigate('/home');
            }
        }

        if (error) {
            console.error('Ошибка при обмене кода через RTK Query:', error);
            navigate('/login');
        }
    }, [data, error, dispatch, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>{isLoading ? 'Связываемся с сервером...' : 'Авторизация...'}</h2>
            <p>Пожалуйста, подождите, мы завершаем вход через Discord.</p>
        </div>
    );
};

export default DiscordCallback;