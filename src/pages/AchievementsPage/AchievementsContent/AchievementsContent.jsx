import React, { useMemo, useState } from 'react'
import './AchievementsContent.scss'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'
import AchievementCard from '../../../components/Cards/AchievementCard/AchievementCard'
import { useSelector } from 'react-redux'
import Switch from '../../../components/Switch/Switch'
import { mainApi } from '../../../store/services/mainApi'

const AchievementsContent = () => {
  const user = useSelector(state => state.accountData);
  const [cardMode, setCardMode] = useState('full');
  const {data: achievements = {achievements: []}, isLoadingAchievments} = mainApi.useGetAllAchievementsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'All',
    obtained: 'All' // 'All', 'Received', 'Not Received'
  });

  const allAchievements = achievements?.achievements || [];

  // 2. Сбор уникальных статусов для кнопок
  const statusOptions = useMemo(() => {
    const statuses = allAchievements
      .map(a => a.status?.name)
      .filter(Boolean);
    return ['All', ...new Set(statuses)];
  }, [allAchievements]);

  // 3. Логика фильтрации
  const filteredAchievements = useMemo(() => {
    return allAchievements.filter(ach => {
      // Фильтр по названию/описанию
      const matchesSearch = ach.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ach.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Фильтр по статусу (редкости)
      const matchesStatus = filters.status === 'All' || ach.status?.name === filters.status;

      // Фильтр "Получено / Не получено"
      const isObtained = ach.usersCount > 0 ? filters.obtained === 'Received' : filters.obtained === 'Not Received';
      const matchesObtained = filters.obtained === 'All' || (ach.usersCount > 0 ? filters.obtained === 'Received' : filters.obtained === 'Not Received');

      return matchesSearch && matchesStatus && matchesObtained;
    });
  }, [allAchievements, searchQuery, filters]);

  return (
    <section className='AchievementsContent'>
      <header className='AchievementsContent__header'>
        <div onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
          <FilterBtn />
        </div>
        <Switch
          checked={cardMode === 'minimal'}
          onChange={() => setCardMode(cardMode === 'minimal' ? 'full' : 'minimal')}
          size="medium"
          checkedColor="#FF720D"
          uncheckedColor="#e5e7eb"
          thumbColor="#ffffff"
          borderColor="#d1d5db"
        />
      </header>

      {isModalOpen && (
        <div className="FiltersModal__overlay" onClick={() => setIsModalOpen(false)}>
          <div className="FiltersModal__content" onClick={e => e.stopPropagation()}>
            <h2>Фильтры достижений</h2>
            
            <div className="FiltersModal__scroll-area">
              {/* Поиск */}
              <div className="FiltersModal__group">
                <p className="FiltersModal__label">Поиск по названию</p>
                <input 
                  type="text" 
                  className="FiltersModal__input" 
                  style={{ width: '100%', textAlign: 'left' }}
                  placeholder="Введите название..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Получено или нет */}
              <div className="FiltersModal__group">
                <p className="FiltersModal__label">Владение</p>
                <div className="FiltersModal__chips">
                  {[
                    { id: 'All', label: 'Все' },
                    { id: 'Received', label: 'Полученные' },
                    { id: 'Not Received', label: 'Не полученные' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      className={`FiltersModal__chip ${filters.obtained === opt.id ? 'FiltersModal__chip--active' : ''}`}
                      onClick={() => setFilters({ ...filters, obtained: opt.id })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Редкость/Тип (динамически из status.name) */}
              <div className="FiltersModal__group">
                <p className="FiltersModal__label">Редкость</p>
                <div className="FiltersModal__chips">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      className={`FiltersModal__chip ${filters.status === status ? 'FiltersModal__chip--active' : ''}`}
                      onClick={() => setFilters({ ...filters, status })}
                    >
                      {status === 'All' ? 'Все уровни' : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="FiltersModal__close" onClick={() => setIsModalOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}

      <main className='AchievementsContent__main'>
        {isLoadingAchievments ? <div>Загрузка...</div> : filteredAchievements.length > 0 ? (
          filteredAchievements.map((achievement, index) => (
            <AchievementCard 
              card={achievement} 
              key={achievement.id || index}
              mode={cardMode}
            />
          ))
        ) : (
          <div className="AchievementsContent__empty">Ачивки не найдены</div>
        )}
      </main>
    </section>
  )
}

export default AchievementsContent