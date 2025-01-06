import React from 'react'
import './SideBar.scss'

import OtherBtn from '../Buttons/OtherBtn/OtherBtn'
import SideBarBtnUI from '../Buttons/SideBarBtnUI/SideBarBtnUI'

import sidebartabs from '../../constants/sidebartabs'

import { ReactComponent as SettingsIcon } from '../../assets/svg/sidebar/settingsIcon.svg'


const SideBar = () => {
  const location = window.location.pathname

  return (
    <aside className='SideBar'>
      <div className='SideBar__profile'>
          <img src="https://i.imgur.com/RpZ6RZ0.png" alt="" width={'52px'} height={'52px'}/>
        <div className='SideBar__profile__info'>
          <h1>Twist_Oli</h1>
          <p>@twist_oli</p>
        </div>
        <OtherBtn />   
      </div>
      <nav className='SideBar__navigation'>
        {sidebartabs.map((tab, index) => 
        <SideBarBtnUI key={index} path={tab.path} active={location === tab.path ? 'active' : ''}>
          <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {tab.icon && <tab.icon width={'25px'} height={'25px'} color='#DE3939'/>}
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