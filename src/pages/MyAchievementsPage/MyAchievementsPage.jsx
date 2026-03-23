import React from 'react'
import './MyAchievementsPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import MyAchievementsContent from './MyAchievementsContent/MyAchievementsContent'

const MyAchievementsPage = () => {
  return (
    <>
      <MainHeader />
      <main className='MyAchievementsPage__content'>
        <SideBar />
        <MyAchievementsContent />
      </main>
    </>
  )
}

export default MyAchievementsPage