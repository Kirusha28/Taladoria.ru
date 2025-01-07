import React from 'react'
import './MainHeader.scss'
import NotificationBtn from '../../Buttons/NotificationBtn/NotificationBtn'

const MainHeader = () => {
  return (
    <header className='MainHeader'>
      <NotificationBtn />
    </header>
  )
}

export default MainHeader