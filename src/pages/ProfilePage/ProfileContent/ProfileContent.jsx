import React from 'react'
import './ProfileContent.scss'
import ContentWrap from '../../../components/Wrappers/ContentWrap'
import SliderAchievements from '../../../components/Sliders/SliderAchievements/SliderAchievements'
import { useSelector } from 'react-redux'

const ProfileContent = () => {
  const user = useSelector(state => state.accountData);
  console.log(user)

  return (
    <section className='ProfileContent'>
      <div className='ProfileContent__information'>
        <ContentWrap active={true} >
          <p>Ведь вы...</p>
          <h1 style={{color: '#FF720D', textWrap: 'nowrap'}}>
            {user?.role_age_data?.name ? user?.role_age_data?.name : '404 - Имя не найдено'}
          </h1>
        </ContentWrap>
        <ContentWrap>
          <p>В институте  вы...</p>
          <h1>
            {user?.role_institute_data?.name ? user?.role_institute_data?.name : '404 - Имя не найдено'}
          </h1>
        </ContentWrap>
        <ContentWrap>
          <p>Ваш факультет...</p>
          <span>
            <h1>{user?.role_faculty_data?.name ? user?.role_faculty_data?.name : 'Никакой'}</h1>
            {user?.role_faculty_data?.description && <h4>{'['+user?.role_faculty_data?.description+']'}</h4>}
          </span>
        </ContentWrap>
        <ContentWrap>
          <p>Участий в ивентах</p>
          <h1>{user?.events_part?.length || 0}</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Регистрация в Таладории</p>
          <h1>{user?.register_date ? new Date(user?.register_date).toLocaleDateString() : 'Не родился' }</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Достижения</p>
          <h1>{user.achievements?.length || 0}</h1>
          <span>заработано</span>
        </ContentWrap>
        <ContentWrap>
          <p>Общее время общения</p>
          <h1>{user?.total_voice_minutes ? (user?.total_voice_minutes / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>MMO время общения</p>
          <h1>{user?.mmo_voice_minutes ? (user?.mmo_voice_minutes / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Co-op время общения</p>
          <h1>{user?.coop_voice_minutes ? (user?.coop_voice_minutes / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Solo время общения</p>
          <h1>{user?.solo_voice_minutes ? (user?.solo_voice_minutes / 60)?.toFixed(0) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Время общения за неделю</p>
          <h1>{user?.week_voice_minutes ? (user?.week_voice_minutes / 60)?.toFixed(1) : 0}</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Количество сообщений</p>
          <h1>{user?.message_count || 0}</h1>
        </ContentWrap>
        
      </div>
      <ContentWrap sx={{ padding: '10px 12px 6px 12px', width: '100%'}}>
        <SliderAchievements/>
      </ContentWrap>
    </section>
  )
}

export default ProfileContent