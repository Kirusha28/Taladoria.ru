import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBarBtnUI from './../Buttons/SideBarBtnUI/SideBarBtnUI'
import { setExpandedTabPath } from '../../store/slices/sidebarUI'

const getCollapseKey = (path) => `!${path}`

const SideBarItem = ({ tab, location }) => {
  const dispatch = useDispatch()
  const expandedTabPath = useSelector(state => state.sidebarUI.expandedTabPath)

  const hasMinitabs = tab.minitabs?.length > 0
  const isChildActive = hasMinitabs && tab.minitabs.some(minitab => minitab.path === location)
  const isExplicitlyCollapsed = expandedTabPath === getCollapseKey(tab.path)
  const isExpanded = !isExplicitlyCollapsed && (expandedTabPath === tab.path || isChildActive)

  const handleParentClick = (event) => {
    event.preventDefault()
    dispatch(setExpandedTabPath(isExpanded ? getCollapseKey(tab.path) : tab.path))
  }

  return (
    <>
      <SideBarBtnUI
        path={tab.path}
        active={location === tab.path || isChildActive ? 'active' : ''}
        onClick={hasMinitabs ? handleParentClick : null}
      >
        <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {tab.icon && <tab.icon width={'25px'} height={'25px'} color='#fff' />}
        </div>
        <p>{tab.title}</p>
      </SideBarBtnUI>
      {isExpanded && hasMinitabs && (
        <div className='SideBarItem__minitab'>
          {tab.minitabs.map((minitab, index) => (
            <div className='SideBarItem__minitab__wrap' key={minitab.path || index}>
              <SideBarBtnUI path={minitab.path} active={location === minitab.path ? 'active' : ''}>
                <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {minitab.icon && <minitab.icon width={'25px'} height={'25px'} color='#fff' />}
                </div>
                <p>{minitab.title}</p>
              </SideBarBtnUI>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SideBarItem
