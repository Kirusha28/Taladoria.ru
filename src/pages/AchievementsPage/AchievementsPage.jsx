import React from 'react'
import './AchievementsPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import AchievementsContent from './AchievementsContent/AchievementsContent'

const AchievementsPage = () => {
  return (
    <>
      <MainHeader />
      <main className='AchievementsPage__content'>
        <SideBar />
        <AchievementsContent />
      </main>
    </>
  )
}

export default AchievementsPage