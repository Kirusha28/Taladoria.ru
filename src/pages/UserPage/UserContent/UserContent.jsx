import React from 'react'
import './UserContent.scss'
import ContentWrap from '../../../components/Wrappers/ContentWrap'
import SliderAchievements from '../../../components/Sliders/SliderAchievements/SliderAchievements'
import { useSelector } from 'react-redux'
import { mainApi } from '../../../store/services/mainApi'
import { useParams } from 'react-router-dom'

const UserContent = () => {
  const userId = useParams()?.id
  const {data: userData = null, isLoadingUser} = mainApi.useGetUserByIdOrUsernameQuery(userId, {skip: !userId});
  console.log(userData)

  return (
    <section className='UserContent'>
      {!isLoadingUser && <div className='UserContent__information'>
        <ContentWrap >
          <img src={userData?.avatar} alt="" height={'65px'} width={'65px'} />
          <h1 style={{color: '#FF720D', textWrap: 'nowrap'}}>
            {userData?.username ? userData?.username : '404 - Имя не найдено'}
          </h1>
        </ContentWrap>
        <ContentWrap active={true} >
          <p>Ведь вы...</p>
          <h1 style={{color: '#FF720D', textWrap: 'nowrap'}}>
            {userData?.role_age_data?.name ? userData?.role_age_data?.name : '404 - Имя не найдено'}
          </h1>
        </ContentWrap>
        <ContentWrap>
          <p>В институте  вы...</p>
          <h1>
            {userData?.role_institute_data?.name ? userData?.role_institute_data?.name : '404 - Имя не найдено'}
          </h1>
        </ContentWrap>
        <ContentWrap>
          <p>Ваш факультет...</p>
          <span>
            <h1>{userData?.role_faculty_data?.name ? userData?.role_faculty_data?.name : 'Никакой'}</h1>
            {userData?.role_faculty_data?.description && <h4>{'['+userData?.role_faculty_data?.description+']'}</h4>}
          </span>
        </ContentWrap>
        <ContentWrap>
          <p>Участий в ивентах</p>
          <h1>{userData?.events_part || 0}</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Регистрация в Таладории</p>
          <h1>{userData?.register_date ? new Date(userData?.register_date).toLocaleDateString() : 'Не родился' }</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Достижения</p>
          <h1>{userData?.achievements?.length || 0}</h1>
          <span>заработано</span>
        </ContentWrap>
        <ContentWrap>
          <p>Общее время общения</p>
          <h1>{userData?.total_voice_minutes ? (Number(userData?.total_voice_minutes) / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Co-op время общения</p>
          <h1>{userData?.coop_voice_minutes ? (Number(userData?.coop_voice_minutes) / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>MMO время общения</p>
          <h1>{userData?.mmo_voice_minutes ? (Number(userData?.mmo_voice_minutes) / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Solo время общения</p>
          <h1>{userData?.solo_voice_minutes ? (Number(userData?.solo_voice_minutes) / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Время общения за неделю</p>
          <h1>{userData?.week_voice_minutes ? (Number(userData?.week_voice_minutes) / 60)?.toFixed(1) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Количество сообщений</p>
          <h1>{userData?.message_count || 0}</h1>
        </ContentWrap>
        
      </div>}
      <ContentWrap sx={{ padding: '10px 12px 6px 12px', width: '100%'}}>
        <SliderAchievements list={userData?.achievements} linkUrl='../assets/achievements/'/>
      </ContentWrap>
    </section>
  )
}

export default UserContent