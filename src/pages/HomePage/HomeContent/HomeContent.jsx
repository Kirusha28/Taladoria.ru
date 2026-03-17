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
  const {data: achievements = 0, isLoadingAchievments} = mainApi.useGetUserByIdQuery(user?.user_id, {skip: !user?.user_id});
  const {data: usersList = {users: [], total: 0}, isLoadingUsersList} = mainApi.useGetAllUsersQuery(15, {skip: !user?.user_id});

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
      {!isLoadingUsersList && <div className='HomeContent__table'>
        <ContentWrap sx={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className='HomeContent__table__head'>
            <h1>Топ Таладорцев</h1>
            <FilterBtn />
          </div>
          <div className='HomeContent__table__headlines'>
            <div className='HomeContent__table__headlines__column' style={{ flex: 10, justifyContent: 'flex-start'}}></div>
            <div className='HomeContent__table__headlines__column' style={{ flex: 10, justifyContent: 'flex-start'}}>Никнейм</div>
            <div className='HomeContent__table__headlines__column'>Фильтр</div>
            <div className='HomeContent__table__headlines__column'>Кол-во</div>
            <div className='HomeContent__table__headlines__column'>+ за неделю</div>
            <div className='HomeContent__table__headlines__column'>Этап</div>
            <div className='HomeContent__table__headlines__column'>Факультет</div>
            <div className='HomeContent__table__headlines__column'>Должность</div>
          </div>
          <div className='HomeContent__table__list'>
            {usersList?.users?.map((user, index) =>
              <div className='HomeContent__table__list__item' key={user?.nickname}>
                <div className='HomeContent__table__list__item__column' style={{ flex: 10, justifyContent: 'flex-start'}}>
                  {index+1}
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
                <span>+</span>  {user?.hoursPerWeek} ч</div>
                <div className='HomeContent__table__list__item__column'>
                  <div className='HomeContent__table__list__item__column__role_age'>
                    {user?.role_age?.name}
                  </div>
                </div>
                <div className='HomeContent__table__list__item__column'>
                  <div className='HomeContent__table__list__item__column__role_faculty'>
                    {user?.role_faculty?.name}
                  </div>
                </div>
                <div className='HomeContent__table__list__item__column'>
                  <div className='HomeContent__table__list__item__column__role_institute'>
                    {user?.role_institute?.name}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ContentWrap>
      </div>}
    </section>
  )
}

export default HomeContent