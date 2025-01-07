import React from 'react'
import './ProfileContent.scss'
import ContentWrap from '../../../components/Wrappers/ContentWrap'
import SliderAchievements from '../../../components/Sliders/SliderAchievements/SliderAchievements'

const ProfileContent = () => {

  return (
    <section className='ProfileContent'>
      <div className='ProfileContent__information'>
        <ContentWrap active={true} >
          <p>Ведь вы...</p>
          <h1 style={{color: '#db0c1b', textWrap: 'nowrap'}}>Легенда Хордовии</h1>
        </ContentWrap>
        <ContentWrap>
          <p>В команде вы...</p>
          <h1>Основатель Хордовии</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Вы...</p>
          <h1>Ванильный Волк</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Участий в ивентах</p>
          <h1>6</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Регистрация в Хордовии</p>
          <h1>02.12.2022</h1>
        </ContentWrap>
        <ContentWrap>
          <p>Достижения</p>
          <h1>23</h1>
          <span>заработано</span>
        </ContentWrap>
        <ContentWrap>
          <p>Время общения</p>
          <h1>45</h1>
          <span>часов</span>
        </ContentWrap>
        <ContentWrap>
          <p>Количество сообщений</p>
          <h1>53</h1>
        </ContentWrap>
        
      </div>
      <ContentWrap sx={{ padding: '10px 12px 6px 12px', width: '100%'}}>
        <SliderAchievements/>
      </ContentWrap>
    </section>
  )
}

export default ProfileContent