import React, { useState } from 'react'
import SideBarBtnUI from './../Buttons/SideBarBtnUI/SideBarBtnUI';

const SideBarItem = ({ tab, location}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <SideBarBtnUI  
        path={tab.path} 
        active={location === tab.path ? 'active' : ''} 
        onClick={tab.minitabs?.length > 0 ? (e) => { e.stopPropagation(); setOpen(!open)} : null}
      >
        <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {tab.icon && <tab.icon width={'25px'} height={'25px'} color='#fff'/>}
        </div>
        <p>{tab.title}</p>
      </SideBarBtnUI>
      {(open && tab.minitabs?.length > 0) && <div className='SideBarItem__minitab' >
        {tab.minitabs.map((minitab, index) =>(
          <div className='SideBarItem__minitab__wrap'>
              <SideBarBtnUI key={index} path={minitab.path} active={location === minitab.path ? 'active' : ''}>
              <div style={{ width: '29px', height: '29px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                {minitab.icon && <minitab.icon width={'25px'} height={'25px'} color='#fff'/>}
              </div>
              <p>{minitab.title}</p>
            </SideBarBtnUI>
          </div>
        ))}
      </div>}
    </>
  )
}

export default SideBarItem

