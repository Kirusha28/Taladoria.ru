import React from 'react'
import './FlappyOwlPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import FlappyOwlContent from './FlappyOwlContent/FlappyOwlContent'

const FlappyOwlPage = () => {
  return (
    <>
      <MainHeader />
      <main className='FlappyOwlPage__content'>
        <SideBar />
        <FlappyOwlContent />
      </main>
    </>
  )
}

export default FlappyOwlPage