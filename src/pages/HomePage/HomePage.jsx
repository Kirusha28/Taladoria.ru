import React from 'react'
import './HomePage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import HomeContent from './HomeContent/HomeContent'

const HomePage = () => {
  return (
    <>
      <MainHeader />
      <main className='HomePage__content'>
        <SideBar />
        <HomeContent />
      </main>
    </>
  )
}

export default HomePage