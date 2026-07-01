import React from 'react'
import './UserPage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'
import UserContent from './UserContent/UserContent'

const UserPage = () => {
  return (
    <>
      <MainHeader />
      <main className='ProfilePage__content'>
        <SideBar />
        <UserContent />
      </main>
    </>
  )
}

export default UserPage