import React from 'react'
import './EventPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import EventContent from './EventContent/EventContent'

const EventPage = () => {
  return (
    <>
      <MainHeader />
      <main className='EventPage__content'>
        <SideBar />
        <EventContent />
      </main>
    </>
  )
}

export default EventPage