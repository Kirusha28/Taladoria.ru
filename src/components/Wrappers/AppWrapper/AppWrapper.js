import React from 'react';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import { mainApi } from './../../../store/services/mainApi';
import { setLoadingFinished, setUser } from '../../../store/slices/accountData';

const AppWrapper = ({ children }) => {
  const token = Cookies.get('token');
  const dispatch = useDispatch();

  // skip: true говорит RTK Query не делать запрос, если нет токена
  const { data, error, isLoading } = mainApi.useGetMeQuery(undefined, {
    skip: !token,
  });

  // Эффект для синхронизации данных из RTK Query в ваш слайс аккаунта
  React.useEffect(() => {
    if (!token) {
      dispatch(setLoadingFinished())
    }
    if (data) {
      dispatch(setUser(data));
    }
    if (error) {
      console.error("Ошибка авторизации:", error);
      Cookies.remove('token');
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  return children;
};

export default AppWrapper;