import React, { useEffect, useState } from 'react'
import './LoginPage.scss'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { mainApi } from './../../store/services/mainApi';

const LoginPage = () => {
  const dispatch = useDispatch()

  const token = Cookies.get('token');
  const { data: userProfile, error, isLoading, refetch } = mainApi.useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  const API_BASE_URL = import.meta.env ? import.meta.env.VITE_API_URL : process.env.REACT_APP_API_URL;


  // 2. Обработка кода из URL (после редиректа Discord)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');

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

  // Функция для очистки сообщений
  const handleLogout = () => {
    Cookies.remove('token');
    window.location.reload(); // Простой способ сбросить все стейты
  };

  return (  
    <main className='LoginPage'>
      <section className='main'>
        {token && (
            <div className="bg-yellow-50 p-6 rounded-lg shadow-md space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Управление токеном</h2>
              <p className="break-all text-sm text-gray-700">
                <span className="font-semibold">Ваш JWT:</span> 
                {/* {token} */}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Выйти
                </button>
              </div>

              {userProfile && (
                <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Данные профиля:</h3>
                  <pre className="text-gray-700 text-sm bg-yellow-200 p-3 rounded-md overflow-x-auto">
                    {JSON.stringify(userProfile, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
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