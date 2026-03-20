import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import './SliderAchievements.scss';
import { ReactComponent as ArrowIcon } from '../../../assets/svg/slider/arrowIcon.svg';

const SliderAchievements = () => {
  const userAchievements = useSelector(state => state.accountData?.achievements || []);
  const [silderPos, setSilderPos] = useState(0);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3); // дефолт для SSR
  const [isMobile, setIsMobile] = useState(false);

  const displayRef = useRef(null);
  const itemWidthRef = useRef(110); // базовая ширина элемента с учётом gap

  // Определение мобильного разрешения (можно вынести в хук useMediaQuery)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Пересчёт количества видимых элементов при изменении ширины контейнера
  const updateVisibleCount = useCallback(() => {
    if (!displayRef.current) return;
    const containerWidth = displayRef.current.clientWidth;
    // ширина элемента = itemWidth (можно получать из CSS переменной)
    const itemTotalWidth = itemWidthRef.current; // ширина элемента + gap (10px)
    const newCount = Math.floor(containerWidth / itemTotalWidth);
    setVisibleItemsCount(Math.max(1, newCount));
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  // Коррекция позиции при изменении количества видимых элементов
  useEffect(() => {
    const maxPos = Math.max(0, userAchievements.length - visibleItemsCount);
    if (silderPos > maxPos) setSilderPos(maxPos);
  }, [visibleItemsCount, userAchievements.length, silderPos]);

  const handlePrev = () => {
    if (silderPos > 0) setSilderPos(prev => prev - 1);
  };

  const handleNext = () => {
    const maxPos = Math.max(0, userAchievements.length - visibleItemsCount);
    if (silderPos < maxPos) setSilderPos(prev => prev + 1);
  };

  // Свайп (touch events)
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) { // порог свайпа
      if (deltaX > 0) {
        handlePrev(); // свайп вправо -> предыдущий
      } else {
        handleNext(); // свайп влево -> следующий
      }
    }
  };

  const visibleAchievements = userAchievements.slice(silderPos, silderPos + visibleItemsCount);

  return (
    <div className="SliderAchievements">
      <h2>
        Последние достижения
      </h2>

      <div
        className="SliderAchievements__slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="SliderAchievements__slider__back"
          style={{ opacity: silderPos > 0 ? 1 : 0.5 }}
          onClick={handlePrev}
          aria-label="Предыдущие"
        >
          <ArrowIcon height="24px" />
        </button>

        <div className="SliderAchievements__slider__display" ref={displayRef}>
          {visibleAchievements.map((item, index) => (
            <div className="SliderAchievements__slider__display__item" key={index}>
              <DynamicImage imageName={item.imgPath} />
            </div>
          ))}
        </div>

        <button
          className="SliderAchievements__slider__next"
          style={{ opacity: silderPos < userAchievements.length - visibleItemsCount ? 1 : 0.5 }}
          onClick={handleNext}
          aria-label="Следующие"
        >
          <ArrowIcon height="24px" style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>

      {/* Индикаторы (точки) на мобильных (опционально) */}
      {isMobile && userAchievements.length > visibleItemsCount && (
        <div className="SliderAchievements__dots">
          {Array.from({ length: Math.ceil(userAchievements.length / visibleItemsCount) }).map((_, idx) => (
            <button
              key={idx}
              className={`SliderAchievements__dots__dot ${silderPos / visibleItemsCount === idx ? 'active' : ''}`}
              onClick={() => setSilderPos(idx * visibleItemsCount)}
              aria-label={`Перейти к группе ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Компонент для отображения изображения (можно вынести в отдельный файл)
const DynamicImage = ({ imageName }) => {
  return <img src={`./assets/achievements/${imageName}`} alt={imageName} />;
};

export default SliderAchievements;