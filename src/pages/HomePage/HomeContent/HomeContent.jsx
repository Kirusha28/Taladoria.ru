import React, { useEffect } from 'react'
import './HomeContent.scss'

import ContentWrap from '../../../components/Wrappers/ContentWrap'
import DisplayGrowth from '../../../components/Displays/DisplayGrowth/DisplayGrowth'
import FilterBtn from '../../../components/Buttons/FilterBtn/FilterBtn'

import listUsers from '../../../constants/listUsers'
import { mainApi } from '../../../store/services/mainApi'
import { useSelector } from 'react-redux'
import { TaladoriansTable } from './../../HomePage/HomeContent/TaladoriansTable/TaladoriansTable';

const HomeContent = () => {
  const user = useSelector(state => state.accountData);
  const {data: totalMinutes = 0, isLoadingMinutes} = mainApi.useGetTotalMinutesQuery();
  const {data: totalUsersCount = 0, isLoadingUsersCount} = mainApi.useGetTotalUsersCountQuery();
  const {data: totalAchievements = 0, isLoadingAchievements} = mainApi.useGetTotalAchievementsQuery();
  const {data: totalOnline = 0, isLoadingOnline} = mainApi.useGetTotalOnlineQuery();
  const {data: achievements = 0, isLoadingAchievments} = mainApi.useGetUserByIdQuery(user?.user_id, {skip: !user?.user_id});
  console.log(totalUsersCount)
  const {data: usersList = {users: [], total: 0}, isLoadingUsersList} = mainApi.useGetAllUsersQuery((totalUsersCount?.totalUsersCount||50), {skip: !user?.user_id});

  useEffect(() => {
    console.log(usersList?.users)
  }, [achievements])

  return (
    <section className='HomeContent'>
      <div className='HomeContent__dashboard'>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>СОВобщество 
            {/* <DisplayGrowth percent={10.0}/> */}
          </h3>
          <h1>{totalUsersCount?.totalUsersCount}</h1>
          <p>участников</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Достижений 
            {/* <DisplayGrowth percent={22.0}/> */}
          </h3>
          <h1>{totalAchievements?.totalAchievements}</h1>
          <p>добавлено</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Общее время в гс 
            {/* <DisplayGrowth percent={12.0}/> */}
          </h3>
          <h1>{(totalMinutes?.totalVoiceTime / 60)?.toFixed(0)}</h1>
          <p>часов</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Онлайн в гс 
            {/* <DisplayGrowth percent={-7.0}/> */}
          </h3>
          <h1>{totalOnline?.totalOnline}</h1>
          <p>человека</p>
        </ContentWrap>
        
      </div>
      <TaladoriansTable 
        usersList={usersList?.users}
        isLoadingUsersList={isLoadingUsersList}
        currentUserId={user?.user_id}
      />
    </section>
  )
}

export default HomeContent