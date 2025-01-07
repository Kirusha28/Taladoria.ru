import React from 'react'
import './ProfilePage.scss'
import MainHeader from '../../components/Headers/MainHeader/MainHeader'
import SideBar from '../../components/SideBar/SideBar'

const ProfilePage = () => {
  return (
    <>
      <MainHeader />
      <main className='ProfilePage__content'>
        <SideBar />
      </main>
    </>
  )
}

export default ProfilePage