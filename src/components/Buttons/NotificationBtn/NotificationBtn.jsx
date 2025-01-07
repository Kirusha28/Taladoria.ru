import React from 'react'
import './NotificationBtn.scss'
import { ReactComponent as NotificationIcon } from '../../../assets/svg/header/notificationIcon.svg'

const NotificationBtn = () => {
  return (
    <button className='NotificationBtn'>
      <NotificationIcon width={30} height={30}/>
    </button>
  )
}

export default NotificationBtn