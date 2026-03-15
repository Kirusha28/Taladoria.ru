import React, { useEffect, useState } from 'react'
import './LoginPage.scss'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const dispatch = useDispatch()
  const API_BASE_URL = 'http://213.159.214.219:4000/api'

  // Состояние для токена JWT и информации о пользователе
  const [token, setToken] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  // Состояния для сообщений об успехе/ошибке
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Функция для очистки сообщений
  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  // Обработчик выхода из системы (очистка токена и профиля)
  const handleLogout = () => {
    setToken('');
    setUserProfile(null);
    clearMessages();
    setMessage('Вы вышли из системы.');
  };

  const fetchUserProfile = async (authToken) => {
    clearMessages();
    if (!authToken) {
      setError('Токен отсутствует. Невозможно получить профиль.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserProfile(data);
        setMessage('Профиль пользователя успешно получен.');
      } else {
        setError(data.message || 'Ошибка получения профиля');
        setUserProfile(null);
      }
    } catch (err) {
      setError('Ошибка сети при получении профиля.');
      console.error('Ошибка получения профиля:', err);
      setUserProfile(null);
    }
  };

  // Эффект для обработки токена из URL (после OAuth)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('code');
    const authError = urlParams.get('auth_error'); // Проверяем на ошибку OAuth

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      setMessage('Токен получен из OAuth-перенаправления.');
      fetchUserProfile(tokenFromUrl); // Автоматически получаем профиль
      // Очищаем URL, чтобы токен не оставался видимым
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authError) {
      setError('OAuth аутентификация не удалась. Пожалуйста, попробуйте еще раз.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  // Пустой массив зависимостей, чтобы эффект запускался только один раз при монтировании

  useEffect(() => {
    if (token && !userProfile) {
      fetchUserProfile(token);
    }
  }, [token, userProfile]);

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
                {/* Кнопка "Получить профиль" теперь не нужна, так как профиль автоматически загружается */}
                {/* Но если хотите сохранить ее для ручного обновления:
                <button
                  onClick={() => fetchUserProfile(token)}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Обновить профиль пользователя
                </button>
                */}
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