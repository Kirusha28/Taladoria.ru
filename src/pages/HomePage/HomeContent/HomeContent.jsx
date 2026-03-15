import React, { useEffect } from 'react'
import './HomeContent.scss'

import ContentWrap from '../../../components/Wrappers/ContentWrap'
import DisplayGrowth from '../../../components/Displays/DisplayGrowth/DisplayGrowth'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'

import listUsers from '../../../constants/listUsers'
import { mainApi } from '../../../store/services/mainApi'
import { useSelector } from 'react-redux'

const HomeContent = () => {
  const user = useSelector(state => state.accountData);
  const {data: totalMinutes = 0, isLoadingMinutes} = mainApi.useGetTotalMinutesQuery();
  const {data: totalUsersCount = 0, isLoadingUsersCount} = mainApi.useGetTotalUsersCountQuery();
  const {data: totalAchievements = 0, isLoadingAchievements} = mainApi.useGetTotalAchievementsQuery();
  const {data: totalOnline = 0, isLoadingOnline} = mainApi.useGetTotalOnlineQuery();
  const {data: achievements = 0, isLoadingAchievments} = mainApi.useGetUserWithAchievementsQuery(user?.user_id, {skip: !user?.user_id});

  useEffect(() => {
    console.log(achievements)
  }, [achievements])

  return (
    <section className='HomeContent'>
      <div className='HomeContent__dashboard'>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>СОВобщество <DisplayGrowth percent={10.0}/></h3>
          <h1>{totalUsersCount?.totalUsersCount}</h1>
          <p>участников</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Достижений <DisplayGrowth percent={22.0}/></h3>
          <h1>{totalAchievements?.totalAchievements}</h1>
          <p>добавлено</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Общее время в гс <DisplayGrowth percent={12.0}/></h3>
          <h1>{(totalMinutes?.totalVoiceTime / 60)?.toFixed(0)}</h1>
          <p>часов</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Онлайн в гс <DisplayGrowth percent={-7.0}/></h3>
          <h1>{totalOnline?.totalOnline}</h1>
          <p>человека</p>
        </ContentWrap>
        
      </div>
      <div className='HomeContent__table'>
        <ContentWrap sx={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className='HomeContent__table__head'>
            <h1>Топ Хордовцев</h1>
            <FilterBtn />
          </div>
          <div className='HomeContent__table__headlines'>
            <div className='HomeContent__table__headlines__column' style={{ flex: 10, justifyContent: 'flex-start'}}>Никнейм</div>
            <div className='HomeContent__table__headlines__column'>Фильтр</div>
            <div className='HomeContent__table__headlines__column'>Кол-во</div>
            <div className='HomeContent__table__headlines__column'>+ за неделю</div>
            <div className='HomeContent__table__headlines__column'>Роль</div>
          </div>
          <div className='HomeContent__table__list'>
            {listUsers.map(user =>
              <div className='HomeContent__table__list__item'>
                <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
                  <div className='img'><img src={user.img} alt="" width={'100%'} height={'100%'}/></div>
                  <p>{user.nick}</p>
                </div>
                <div className='HomeContent__table__list__item__column'>{user.status}</div>
                <div className='HomeContent__table__list__item__column'>{user.totalHour} ч</div>
                <div className='HomeContent__table__list__item__column'>
                <span>+</span>  {user.hoursPerWeek} ч</div>
                <div className='HomeContent__table__list__item__column'>
                  <div className='HomeContent__table__list__item__column__role'>
                    {user.role}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContentWrap>
      </div>
    </section>
  )
}

export default HomeContent