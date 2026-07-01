import React from 'react'
import './MiniGamesPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import MiniGamesContent from './MiniGamesContent/MiniGamesContent'

const MiniGamesPage = () => {
  return (
    <>
      <MainHeader />
      <main className='MiniGamesPage__content'>
        <SideBar />
        <MiniGamesContent />
      </main>
    </>
  )
}

export default MiniGamesPage
