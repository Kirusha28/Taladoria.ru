import React from 'react'
import './HomeContent.scss'

import ContentWrap from '../../../components/Wrappers/ContentWrap'
import DisplayGrowth from '../../../components/Displays/DisplayGrowth/DisplayGrowth'

const HomeContent = () => {
  return (
    <section className='HomeContent'>
      <div className='HomeContent__dashboard'>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>СооБорщество <DisplayGrowth percent={10.0}/></h3>
          <h1>810</h1>
          <p>участников</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Достижений <DisplayGrowth percent={22.0}/></h3>
          <h1>2304</h1>
          <p>добавлено</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Общее время в гс <DisplayGrowth percent={12.0}/></h3>
          <h1>50000</h1>
          <p>часов</p>
        </ContentWrap>
        <ContentWrap sx={{ flex: 1,}}>
          <h3>Онлайн в гс <DisplayGrowth percent={-7.0}/></h3>
          <h1>53</h1>
          <p>человека</p>
        </ContentWrap>
        
      </div>
      <div>
        <ContentWrap >

        </ContentWrap>
      </div>
    </section>
  )
}

export default HomeContent