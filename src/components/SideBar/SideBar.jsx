import React from 'react'
import './SideBar.scss'

import OtherBtn from '../Buttons/OtherBtn/OtherBtn'
import SideBarBtnUI from '../Buttons/SideBarBtnUI/SideBarBtnUI'

import sidebartabs from '../../constants/sidebartabs'

import { ReactComponent as SettingsIcon } from '../../assets/svg/sidebar/settingsIcon.svg'
import { useSelector } from 'react-redux'


const SideBar = () => {
  const location = window.location.pathname
  const user = useSelector(state => state.accountData)

  return (
    <aside className='SideBar'>
      <div className='SideBar__profile'>
          <img src={user?.avatar} alt="" width={'52px'} height={'52px'}/>
        <div className='SideBar__profile__info'>
          <h1>{user?.nickname}</h1>
          <p>@{user.username}</p>
        </div>
        <OtherBtn />   
      </div>
      <nav className='SideBar__navigation'>
        {sidebartabs.map((tab, index) => 
        <SideBarBtnUI key={index} path={tab.path} active={location === tab.path ? 'active' : ''}>
          <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {tab.icon && <tab.icon width={'25px'} height={'25px'} color='#fff'/>}
          </div>
          <p>{tab.title}</p>
        </SideBarBtnUI>)}
      </nav>
      <SideBarBtnUI path={'/settings'} active={location === '/settings' ? 'active' : ''} sx={{marginTop: 'auto'}}>
        <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SettingsIcon width={'25px'} height={'25px'}/>
        </div>
        <p>Настройки</p>
      </SideBarBtnUI>
    </aside>
  )
}

export default SideBar