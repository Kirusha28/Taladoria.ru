import React, { useState, useMemo } from 'react';
import ContentWrap from '../../../../components/Wrappers/ContentWrap';
import FilterBtn from '../../../../components/Buttons/FilterBtn/FilterBtn';
// Ваши остальные импорты (ContentWrap, FilterBtn и т.д.)

export const TaladoriansTable = ({ usersList, isLoadingUsersList=false, currentUserId }) => {
  // Состояние для пагинации (по умолчанию показываем 15 человек)
  const [visibleCount, setVisibleCount] = useState(15);

  const allUsers = usersList || [];

  // Находим индекс текущего пользователя, чтобы знать его реальное место
  const currentUserIndex = useMemo(() => {
    return allUsers.findIndex(user => user.user_id === currentUserId);
  }, [allUsers, currentUserId]);

  // Отсекаем пользователей для текущего отображения
  const visibleUsers = allUsers.slice(0, visibleCount);

  // Проверяем, находится ли уже наш пользователь в видимой части списка
  const isCurrentUserVisible = currentUserIndex !== -1 && currentUserIndex < visibleCount;

  // Функция для подгрузки следующей партии
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  // Выносим рендер строки в отдельную функцию во избежание дублирования кода
  const renderUserRow = (user, rank, isPinned = false) => (
    // Добавляем модификатор --pinned для стилизации прилипшей строки (по БЭМ)
    <div className={`HomeContent__table__list__item ${isPinned ? 'HomeContent__table__list__item--pinned' : ''}`} key={user?.user_id || rank}>
      <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
        {rank}
      </div>
      <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
        <div className='img'><img src={user?.avatar} alt="" width={'100%'} height={'100%'}/></div>
        <p>{user?.nickname}</p>
      </div>
      <div className='HomeContent__table__list__item__column'>
        {user?.status ? 
          <><div className='green'></div>Онлайн</> 
        : <><div className='red'></div>Оффлайн</>}
      </div> 
      <div className='HomeContent__table__list__item__column'>{(user?.total_voice_minutes/60)?.toFixed(0)} ч</div>
      <div className='HomeContent__table__list__item__column'>
        <span>+</span> {user?.hoursPerWeek || 0} ч
      </div>
      <div className='HomeContent__table__list__item__column'>
        <div className='HomeContent__table__list__item__column__role_age'>
          {user?.role_age?.name || '-'}
        </div>
      </div>
      <div className='HomeContent__table__list__item__column'>
        <div className='HomeContent__table__list__item__column__role_faculty'>
          {user?.role_faculty?.name || '-'}
        </div>
      </div>
      <div className='HomeContent__table__list__item__column'>
        <div className='HomeContent__table__list__item__column__role_institute'>
          {user?.role_institute?.name || '-'}
        </div>
      </div>
    </div>
  );

  return (
    !isLoadingUsersList ? (
      <div className='HomeContent__table'>
        <ContentWrap sx={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className='HomeContent__table__head'>
            <h1>Топ Таладорцев</h1>
            <FilterBtn />
          </div>
          
          <div className='HomeContent__table__headlines'>
            <div className='HomeContent__table__headlines__column' style={{ flex: 10, justifyContent: 'flex-start'}}>#</div>
            <div className='HomeContent__table__headlines__column' style={{ flex: 10, justifyContent: 'flex-start'}}>Никнейм</div>
            <div className='HomeContent__table__headlines__column'>Статус</div>
            <div className='HomeContent__table__headlines__column'>Кол-во</div>
            <div className='HomeContent__table__headlines__column'>+ за неделю</div>
            <div className='HomeContent__table__headlines__column'>Этап</div>
            <div className='HomeContent__table__headlines__column'>Факультет</div>
            <div className='HomeContent__table__headlines__column'>Должность</div>
          </div>
          
          <div className='HomeContent__table__list'>
            {/* 1. Рендерим первые 15 (или больше) пользователей */}
            {visibleUsers.map((user, index) => renderUserRow(user, index + 1))}

            {/* 2. Если мы не вошли в текущий видимый топ — рендерим себя в самом низу */}
            {!isCurrentUserVisible && currentUserIndex !== -1 && (
              <>
                
                {/* Передаем индекс + 1 как реальное место в топе */}
                {renderUserRow(allUsers[currentUserIndex], currentUserIndex + 1, true)}
              </>
            )}
          </div>

          {/* 3. Кнопка подгрузки пагинации */}
          {visibleCount < allUsers.length && (
            <div className='HomeContent__table__pagination'>
              <button onClick={handleLoadMore} className='HomeContent__table__load-more-btn'>
                Загрузить ещё
              </button>
            </div>
          )}
        </ContentWrap>
      </div>
    ) : (
      <div className='HomeContent__table__loading'>
        <div className='HomeContent__table__loading__indicator'>
          <div>Загрузка</div>
        </div>
      </div>
    )
  );
};