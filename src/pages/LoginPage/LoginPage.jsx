import React, { useEffect, useState } from 'react'
import './LoginPage.scss'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { mainApi } from './../../store/services/mainApi';

const LoginPage = () => {
  const dispatch = useDispatch()

  const token = Cookies.get('token');
  const { data: userProfile, error, isLoading, refetch } = mainApi.useGetUserProfileQuery(token, {
    skip: !token,
  });

  const API_BASE_URL = import.meta.env ? import.meta.env.VITE_API_URL : process.env.REACT_APP_API_URL;


  // 2. Обработка кода из URL (после редиректа Discord)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('urlParams', urlParams)
    const codeFromUrl = urlParams.get('code');
    console.log('codeFromUrl', codeFromUrl)
    if (codeFromUrl) {
      // Здесь ваша логика: либо вы записываете code как токен (как в вашем примере),
      // либо отправляете этот code на бэк, чтобы получить реальный JWT.
      // Если ваш бэк сразу шлет JWT в параметре code:
      Cookies.set('token', codeFromUrl, { expires: 7 });
      
      // Очищаем URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Заставляем RTK Query обновить данные профиля
      refetch();
    }
  }, [refetch]);


  return (  
    <main className='LoginPage'>
      <section className='main'>
          <div className='LoginPage__modal'>
            <h1>Найти свою Совушку</h1>
            
            <button
              onClick={() => {window.open(`${API_BASE_URL}/auth/discord`, '_self')}}
            >
              Войти через святой Discord
            </button>
          </div>
      </section>
    </main>
  )
}

export default LoginPage