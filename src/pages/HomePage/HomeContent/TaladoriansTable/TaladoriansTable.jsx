import React, { useState, useMemo } from 'react';
import ContentWrap from '../../../../components/Wrappers/ContentWrap';
import FilterBtn from '../../../../components/Buttons/FilterBtn/FilterBtn';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import './TaladoriansTable.scss';
import { useNavigate } from 'react-router-dom';
import DualRangeSlider from '../../../../components/DualRangeSlider/DualRangeSlider';
import { useImageLightbox } from '../../../../components/ImageLightbox/ImageLightbox';

const TABLE_COLUMNS = [
  { key: 'rank', label: '#', align: 'start' },
  { key: 'nickname', label: 'Никнейм', align: 'start' },
  { key: 'status', label: 'Статус', align: 'center', mobile: false },
  { key: 'total_voice_minutes', label: 'Общее время' },
  { key: 'week_voice_minutes', label: '+ за неделю', mobile: false },
  { key: 'solo_voice_minutes', label: 'SOLO время', shortLabel: 'SOLO', mobile: false },
  { key: 'coop_voice_minutes', label: 'Co-op', mobile: false },
  { key: 'mmo_voice_minutes', label: 'MMO', mobile: false },
  { key: 'role_age', label: 'Этап', mobile: false },
  { key: 'role_faculty', label: 'Факультет', mobile: false },
  { key: 'role_institute', label: 'Роль', mobile: false },
];

const getSortValue = (key, user, topRankMap) => {
  switch (key) {
    case 'rank':
      return topRankMap.get(user.user_id) ?? Number.MAX_SAFE_INTEGER;
    case 'nickname':
      return (user.nickname || '').toLowerCase();
    case 'status':
      return user.status ? 1 : 0;
    case 'total_voice_minutes':
      return Number(user.total_voice_minutes) || 0;
    case 'week_voice_minutes':
      return Number(user.week_voice_minutes) || 0;
    case 'solo_voice_minutes':
      return Number(user.solo_voice_minutes) || 0;
    case 'coop_voice_minutes':
      return Number(user.coop_voice_minutes) || 0;
    case 'mmo_voice_minutes':
      return Number(user.mmo_voice_minutes) || 0;
    case 'role_age':
      return (user.role_age?.name || '').toLowerCase();
    case 'role_faculty':
      return (user.role_faculty?.name || '').toLowerCase();
    case 'role_institute':
      return (user.role_institute?.name || '').toLowerCase();
    default:
      return 0;
  }
};

const compareSortValues = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a ?? '').localeCompare(String(b ?? ''), 'ru', { numeric: true, sensitivity: 'base' });
};

// Ваши остальные импорты (ContentWrap, FilterBtn и т.д.)

export const TaladoriansTable = ({ usersList, isLoadingUsersList=false, currentUserId }) => {
  const mobileView = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const { openLightbox } = useImageLightbox();
  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Состояния для фильтров
  const [filters, setFilters] = useState({
    role_age: 'All',
    role_faculty: 'All',
    role_institute: 'All',
    status: 'All', // 'All', 'Online', 'Offline'
    timeRange: { min: 0, max: null },
    timeRangeWeek: { min: 0, max: null },
    timeRangeSolo: { min: 0, max: null },
    timeRangeCoop: { min: 0, max: null },
    timeRangeMMO: { min: 0, max: null },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, order: null });

  const topRankMap = useMemo(() => {
    const map = new Map();
    (usersList || []).forEach((user, index) => map.set(user.user_id, index + 1));
    return map;
  }, [usersList]);

  const getTopRank = (user) => topRankMap.get(user?.user_id) ?? '—';

  // Собираем уникальные значения для фильтров из общего списка
  const filterOptions = useMemo(() => {
    const getUniques = (key) => {
      const values = usersList
        ?.map(user => user[key]?.name)
        .filter(name => name) || [];
      return ['All', ...new Set(values)];
    };

    return {
      role_age: getUniques('role_age'),
      role_faculty: getUniques('role_faculty'),
      role_institute: getUniques('role_institute')
    };
  }, [usersList]);

  const timeRangeBounds = useMemo(() => {
    const calcMax = (field) => {
      const hours = (usersList || []).map(user => (user[field] || 0) / 60);
      return Math.ceil(Math.max(...hours, 1));
    };

    return {
      timeRange: calcMax('total_voice_minutes'),
      timeRangeWeek: calcMax('week_voice_minutes'),
      timeRangeSolo: calcMax('solo_voice_minutes'),
      timeRangeCoop: calcMax('coop_voice_minutes'),
      timeRangeMMO: calcMax('mmo_voice_minutes'),
    };
  }, [usersList]);

  // Фильтруем пользователей ПЕРЕД пагинацией
  const filteredUsers = useMemo(() => {
    return (usersList || []).filter(user => {
      // Проверка статуса
      if (filters.status === 'Online' && !user.status) return false;
      if (filters.status === 'Offline' && user.status) return false;

      // Вспомогательная функция для проверки попадания времени в диапазон
      const checkTime = (userMinutes, rangeState, boundsMax) => {
        const hours = (userMinutes || 0) / 60;
        const minH = rangeState.min ?? 0;
        const maxH = rangeState.max ?? boundsMax;
        return hours >= minH && hours <= maxH;
      };

      // Проверяем все типы времени
      if (!checkTime(user.total_voice_minutes, filters.timeRange, timeRangeBounds.timeRange)) return false;
      if (!checkTime(user.week_voice_minutes, filters.timeRangeWeek, timeRangeBounds.timeRangeWeek)) return false;
      if (!checkTime(user.solo_voice_minutes, filters.timeRangeSolo, timeRangeBounds.timeRangeSolo)) return false;
      if (!checkTime(user.coop_voice_minutes, filters.timeRangeCoop, timeRangeBounds.timeRangeCoop)) return false;
      if (!checkTime(user.mmo_voice_minutes, filters.timeRangeMMO, timeRangeBounds.timeRangeMMO)) return false;

      // Проверка ролей
      const roleKeys = ['role_age', 'role_faculty', 'role_institute'];
      for (let key of roleKeys) {
        if (filters[key] !== 'All' && user[key]?.name !== filters[key]) {
          return false;
        }
      }

      return true;
    });
  }, [usersList, filters, timeRangeBounds]);

  const sortedUsers = useMemo(() => {
    if (!sortConfig.key || !sortConfig.order) {
      return filteredUsers;
    }

    return [...filteredUsers].sort((userA, userB) => {
      const valueA = getSortValue(sortConfig.key, userA, topRankMap);
      const valueB = getSortValue(sortConfig.key, userB, topRankMap);
      const comparison = compareSortValues(valueA, valueB);
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  }, [filteredUsers, sortConfig, topRankMap]);

  const allUsers = sortedUsers;
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  
  // Сброс страницы при смене фильтра
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Находим индекс текущего пользователя, чтобы знать его реальное место
  const currentUserIndex = useMemo(() => {
    return allUsers.findIndex(user => user.user_id === currentUserId);
  }, [allUsers, currentUserId]);

  // Вычисляем границы для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Отсекаем пользователей для текущего отображения
  const visibleUsers = allUsers.slice(startIndex, endIndex);

  // Проверяем, находится ли уже наш пользователь в видимой части списка
  const isCurrentUserVisible = currentUserIndex !== -1 && currentUserIndex >= startIndex && currentUserIndex < endIndex;

  // Функции навигации по страницам
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Прокручиваем таблицу вверх при переключении страницы
      window.scrollTo({ top: document.querySelector('.HomeContent__table')?.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Генерируем массив видимых номеров страниц для отображения
  const getVisiblePageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = 5;

    if (totalPages <= maxVisibleButtons) {
      // Если страниц мало - показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если много страниц - показываем текущую и соседние
      let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
      let endPage = startPage + maxVisibleButtons - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
      }

      // Всегда показываем первую страницу
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Всегда показываем последнюю страницу
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleTimeRangeChange = (rangeKey, min, max) => {
    setFilters(prev => ({
      ...prev,
      [rangeKey]: { min, max },
    }));
    setCurrentPage(1);
  };

  const handleSortClick = (columnKey) => {
    setSortConfig(prev => {
      if (prev.key !== columnKey) {
        return { key: columnKey, order: 'asc' };
      }
      if (prev.order === 'asc') {
        return { key: columnKey, order: 'desc' };
      }
      return { key: null, order: null };
    });
    setCurrentPage(1);
  };

  const visibleColumns = TABLE_COLUMNS.filter(column => mobileView ? column.mobile !== false : true);

  const renderSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↕';
    if (sortConfig.order === 'asc') return '↑';
    if (sortConfig.order === 'desc') return '↓';
    return '↕';
  };

  const renderTableHeadlines = () => (
    <div className={`HomeContent__table__headlines${mobileView ? ' HomeContent__table__headlines--mobile' : ''}`}>
      {visibleColumns.map(column => (
        <button
          key={column.key}
          type='button'
          className={[
            'HomeContent__table__headlines__column',
            'HomeContent__table__headlines__column--sortable',
            column.align === 'start' ? 'HomeContent__table__headlines__column--align-start' : '',
            sortConfig.key === column.key && sortConfig.order ? `HomeContent__table__headlines__column--sort-${sortConfig.order}` : '',
          ].filter(Boolean).join(' ')}
          onClick={() => handleSortClick(column.key)}
          aria-label={`Сортировка: ${column.label}`}
        >
          <span>{mobileView && column.shortLabel ? column.shortLabel : column.label}</span>
          <span className='HomeContent__table__sort-indicator' aria-hidden='true'>
            {renderSortIndicator(column.key)}
          </span>
        </button>
      ))}
    </div>
  );

  // Конфиг для рендера всех полей времени (чтобы не дублировать код)
  const timeFiltersConfig = [
    { key: 'timeRange', label: 'Общее время (часы)', step: 1 },
    { key: 'timeRangeWeek', label: '+ за неделю (часы)', step: 0.1 },
    { key: 'timeRangeSolo', label: 'SOLO время (часы)', step: 1 },
    { key: 'timeRangeCoop', label: 'Co-op время (часы)', step: 1 },
    { key: 'timeRangeMMO', label: 'MMO время (часы)', step: 1 },
  ];

  const handleAvatarOpen = (event, user) => {
    event.stopPropagation();
    openLightbox({
      src: user?.avatar,
      alt: user?.nickname || 'Аватар',
      caption: user?.nickname,
    });
  };

  // Выносим рендер строки в отдельную функцию во избежание дублирования кода
  const renderUserRow = (user, rank, isPinned = false) =>  (mobileView ? <div 
    className={`HomeContent__table__list__item ${isPinned ? 'HomeContent__table__list__item--pinned' : ''}`} 
    key={user?.user_id || rank}>
      <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
        {rank}
      </div>
      <div 
        className='HomeContent__table__list__item__column' 
        style={{ flex: 10, justifyContent: 'flex-start'}}
        onClick={() => navigate(`/profile/${user?.user_id}`)}  
      >
        <div className='img' onClick={(event) => handleAvatarOpen(event, user)}>
          <img src={user?.avatar} alt="" width={'100%'} height={'100%'}/>
        </div>
        <p>{user?.status ? 
          <div className='green'></div> 
        : <div className='red'></div>}{user?.nickname}</p>
      </div>
      <div className='HomeContent__table__list__item__column'>{(user?.total_voice_minutes/60)?.toFixed(0)} ч</div>
    </div> :
    // Добавляем модификатор --pinned для стилизации прилипшей строки (по БЭМ)
    <div 
      className={`HomeContent__table__list__item ${isPinned ? 'HomeContent__table__list__item--pinned' : ''}`} 
      key={user?.user_id || rank}
    >
      <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
        {rank}
      </div>
      <div 
        className='HomeContent__table__list__item__column' 
        style={{ flex: 10, justifyContent: 'flex-start'}}
        onClick={() => navigate(`/profile/${user?.user_id}`)}  
      >
        <div className='img' onClick={(event) => handleAvatarOpen(event, user)}>
          <img src={user?.avatar} alt="" width={'100%'} height={'100%'}/>
        </div>
        <p>{user?.nickname}</p>
      </div>
      <div className='HomeContent__table__list__item__column'>
        {user?.status ? 
          <><div className='green'></div>Онлайн</> 
        : <><div className='red'></div>Оффлайн</>}
      </div> 
      <div className='HomeContent__table__list__item__column'>{(user?.total_voice_minutes/60)?.toFixed(0)} ч</div>
      <div className='HomeContent__table__list__item__column'>
        <span>+</span> {(user?.week_voice_minutes / 60)?.toFixed(1) || 0} ч
      </div>
      <div className='HomeContent__table__list__item__column'>
        <span>+</span> {(user?.solo_voice_minutes / 60)?.toFixed(0) || 0} ч
      </div>
      <div className='HomeContent__table__list__item__column'>
        <span>+</span> {(user?.coop_voice_minutes / 60)?.toFixed(0) || 0} ч
      </div>
      <div className='HomeContent__table__list__item__column'>
        <span>+</span> {(user?.mmo_voice_minutes / 60)?.toFixed(0) || 0} ч
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
        <ContentWrap fluid sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className='HomeContent__table__head'>
            <h1>Топ Таладорцев</h1>
            <div onClick={() => setIsModalOpen(true)}>
              <FilterBtn />
            </div>
          </div>
          {/* В самом конце компонента перед закрывающей скобкой isLoadingUsersList */}
          {isModalOpen && (
            <div className="FiltersModal__overlay" onClick={() => setIsModalOpen(false)}>
              <div className="FiltersModal__content" onClick={e => e.stopPropagation()}>
                <div className="FiltersModal__header">
                  <h2>Фильтры</h2>
                </div>
                
                <div className="FiltersModal__scroll-area">
                  {/* Фильтр по Статусу */}
                  <div className="FiltersModal__group">
                    <p className="FiltersModal__label">Статус сети</p>
                    <div className="FiltersModal__chips">
                      {['All', 'Online', 'Offline'].map(statusOpt => (
                        <button
                          key={statusOpt}
                          className={`FiltersModal__chip ${filters.status === statusOpt ? 'FiltersModal__chip--active' : ''}`}
                          onClick={() => handleFilterChange('status', statusOpt)}
                        >
                          {statusOpt === 'All' ? 'Все' : statusOpt === 'Online' ? 'Онлайн' : 'Оффлайн'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Отрисовка всех фильтров времени циклом */}
                  <div className="FiltersModal__time-grid">
                    {timeFiltersConfig.map(({ key, label, step }) => (
                      <div key={key} className="FiltersModal__group">
                        <p className="FiltersModal__label">{label}</p>
                        <DualRangeSlider
                          min={0}
                          max={timeRangeBounds[key]}
                          valueMin={filters[key].min}
                          valueMax={filters[key].max ?? timeRangeBounds[key]}
                          step={step}
                          unit=" ч"
                          onChange={(min, max) => handleTimeRangeChange(key, min, max)}
                        />
                      </div>
                    ))}
                  </div>
                  <br />

                  {/* Фильтры по ролям */}
                  {Object.entries(filterOptions).map(([key, options]) => (
                    <div key={key} className="FiltersModal__group">
                      <p className="FiltersModal__label">
                        {key === 'role_age' ? 'Этап' : key === 'role_faculty' ? 'Факультет' : 'Роль в институте'}
                      </p>
                      <div className="FiltersModal__chips">
                        {options.map(option => (
                          <button
                            key={option}
                            className={`FiltersModal__chip ${filters[key] === option ? 'FiltersModal__chip--active' : ''}`}
                            onClick={() => handleFilterChange(key, option)}
                          >
                            {option === 'All' ? 'Все' : option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="FiltersModal__close" onClick={() => setIsModalOpen(false)}>Применить</button>
              </div>
            </div>
          )}
          
          <div className='HomeContent__table__scroll'>
          {renderTableHeadlines()}
          <div className={`HomeContent__table__list${mobileView ? ' HomeContent__table__list--mobile' : ''}`}>
            {/* 1. Рендерим первые 15 (или больше) пользователей */}
            {visibleUsers.map((user) => renderUserRow(user, getTopRank(user)))}

            {!isCurrentUserVisible && currentUserIndex !== -1 && (
              <>
                {renderUserRow(allUsers[currentUserIndex], getTopRank(allUsers[currentUserIndex]), true)}
              </>
            )}
          </div>
          </div>

          {/* 3. Пагинация */}
          {totalPages > 1 && (
            <div className='HomeContent__table__pagination'>
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className='HomeContent__table__pagination-btn HomeContent__table__pagination-btn--arrow'
              >
                ◀
              </button>

              {getVisiblePageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className='HomeContent__table__pagination-ellipsis'>...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`HomeContent__table__pagination-btn ${currentPage === page ? 'HomeContent__table__pagination-btn--active' : ''}`}
                  >
                    {page}
                  </button>
                )
              ))}

              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className='HomeContent__table__pagination-btn HomeContent__table__pagination-btn--arrow'
              >
                ▶
              </button>
              
              <div className='HomeContent__table__pagination-info'>
                Страница {currentPage} из {totalPages} • Всего: {allUsers.length}
              </div>
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