import React from 'react'
import './SideBarBtnUI.scss'
import { useNavigate } from 'react-router-dom'

const SideBarBtnUI = ({ children, path, active, sx={} }) => {
  const navigate = useNavigate()

  return (
    <button className={'SideBarBtnUI '+active} onClick={() => navigate(path)} style={sx}>
      <div className='SideBarBtnUI__indicator '>
        <div></div>
      </div>
      {children}
    </button>
  )
}

export default SideBarBtnUI