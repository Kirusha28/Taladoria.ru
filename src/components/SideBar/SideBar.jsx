import React, { useEffect } from 'react'
import './SideBar.scss'

import OtherBtn from '../Buttons/OtherBtn/OtherBtn'
import SideBarBtnUI from '../Buttons/SideBarBtnUI/SideBarBtnUI'

import sidebartabs from '../../constants/sidebartabs'

import { ReactComponent as SettingsIcon } from '../../assets/svg/sidebar/settingsIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import SideBarItem from './SideBarItem';
import useMediaQuery from './../../hooks/useMediaQuery';
import ModalUI from '../Modal/ModalUI/ModalUI'
import { LightboxImage } from '../ImageLightbox/ImageLightbox'
import { setMobileSidebarOpen, setExpandedTabPath } from '../../store/slices/sidebarUI'
import { useLocation } from 'react-router-dom'


const SideBar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.accountData)
  const isOpen = useSelector(state => state.sidebarUI.mobileOpen)
  const mobileView = useMediaQuery('(max-width: 768px)');

  const openSidebar = () => dispatch(setMobileSidebarOpen(true))
  const closeSidebar = () => dispatch(setMobileSidebarOpen(false))

  useEffect(() => {
    const parentTab = sidebartabs.find(tab =>
      tab.minitabs?.some(minitab => minitab.path === location.pathname)
    )
    if (parentTab) {
      dispatch(setExpandedTabPath(parentTab.path))
    }
  }, [location.pathname, dispatch])

  const sidebarContent = (
    <aside className='SideBar' style={mobileView ? { height: '100%' } : undefined}>
      <div className='SideBar__profile'>
        <LightboxImage
          src={user?.avatar}
          alt={user?.nickname || user?.username || 'Аватар'}
          caption={user?.nickname || user?.username}
          width='52px'
          height='52px'
        />
        <div className='SideBar__profile__info'>
          <h1>{user?.nickname}</h1>
          <p>@{user.username}</p>
        </div>
        {mobileView && (
          <OtherBtn
            onClick={closeSidebar}
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
          >
            x
          </OtherBtn>
        )}
        {!mobileView && <OtherBtn />}
      </div>
      <nav className='SideBar__navigation'>
        {sidebartabs.map((tab, index) => (
          <SideBarItem key={tab.path || index} tab={tab} location={location.pathname} />
        ))}
      </nav>
      {mobileView && (
        <SideBarBtnUI path={'/settings'} active={location.pathname === '/settings' ? 'active' : ''} sx={{ marginTop: 'auto' }}>
          <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SettingsIcon width={'25px'} height={'25px'} />
          </div>
          <p>Настройки</p>
        </SideBarBtnUI>
      )}
    </aside>
  )

  if (!mobileView) {
    return sidebarContent
  }

  return (
    <>
      <OtherBtn
        onClick={openSidebar}
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
        onClose={closeSidebar}
        closeOnOverlayClick={false}
      >
        {sidebarContent}
      </ModalUI>
    </>
  )
}

export default SideBar
