import { useState, useEffect } from 'react';

/**
 * Хук для отслеживания состояния медиазапроса
 * @param {string} query - медиазапрос (например, '(min-width: 768px)')
 * @param {boolean} defaultMatches - значение по умолчанию (для SSR/первого рендера)
 * @returns {boolean} - true, если медиазапрос выполнен
 */

function useMediaQuery(query, defaultMatches = false) {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    // Проверка наличия window и matchMedia (для SSR)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    // Устанавливаем начальное состояние
    setMatches(mediaQueryList.matches);

    // Добавляем слушатель (современный способ)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    } 
    // Для старых браузеров (Safari < 14)
    else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handleChange);
      return () => mediaQueryList.removeListener(handleChange);
    }
  }, [query]);

  return matches;
}

export default useMediaQuery;