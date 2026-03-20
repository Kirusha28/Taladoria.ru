import React, { useState } from 'react'
import './SideBar.scss'

import OtherBtn from '../Buttons/OtherBtn/OtherBtn'
import SideBarBtnUI from '../Buttons/SideBarBtnUI/SideBarBtnUI'

import sidebartabs from '../../constants/sidebartabs'

import { ReactComponent as SettingsIcon } from '../../assets/svg/sidebar/settingsIcon.svg'
import { useSelector } from 'react-redux'
import SideBarItem from './SideBarItem';
import useMediaQuery from './../../hooks/useMediaQuery';
import ModalUI from '../Modal/ModalUI/ModalUI'


const SideBar = () => {
  const location = window.location.pathname
  const user = useSelector(state => state.accountData)
  const mobileView = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);

  return (mobileView ? <>
      <OtherBtn 
        onClick={() => setIsOpen(true)} 
        sx={{ 
          position: 'fixed', 
          top: '10px', 
          left: '10px',
          minWidth: '40px',
          maxWidth: '40px',
          minHeight: '40px',
          maxHeight: '40px',
          background: '#EBEBEB',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          opacity: 0.8,
        }}
      />

      <ModalUI
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Заголовок"
        actions={null}
      >
        <aside className='SideBar' style={{ height: '100%'}}>
          <div className='SideBar__profile'>
              <img src={user?.avatar} alt="" width={'52px'} height={'52px'}/>
            <div className='SideBar__profile__info'>
              <h1>{user?.nickname}</h1>
              <p>@{user.username}</p>
            </div>
            <OtherBtn onClick={() => setIsOpen(false)} 
              sx={{ 
                minWidth: '40px',
                maxWidth: '40px',
                minHeight: '40px',
                maxHeight: '40px',
                background: '#fff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
              }}  
            >x</OtherBtn>   
          </div>
          <nav className='SideBar__navigation'>
            {sidebartabs.map((tab, index) => 
              <SideBarItem key={index} tab={tab} location={location}/>
            )}
          </nav>
          <SideBarBtnUI path={'/settings'} active={location === '/settings' ? 'active' : ''} sx={{marginTop: 'auto'}}>
            <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SettingsIcon width={'25px'} height={'25px'}/>
            </div>
            <p>Настройки</p>
          </SideBarBtnUI>
        </aside>
      </ModalUI>
    </> :
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
          <SideBarItem key={index} tab={tab} location={location}/>
        )}
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