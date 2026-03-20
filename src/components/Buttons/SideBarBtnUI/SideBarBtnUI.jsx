import React from 'react'
import './SideBarBtnUI.scss'
import { useNavigate } from 'react-router-dom'

const SideBarBtnUI = ({ children, path, active, sx={}, onClick=null }) => {
  const navigate = useNavigate()

  return (
    <button 
      className={'SideBarBtnUI '+active} 
      onClick={(e) => {
        if (onClick == null) {
          navigate(path)
        } else {
          onClick(e)
        }
      }} 
      style={sx}
    >
      <div className='SideBarBtnUI__indicator '>
        <div></div>
      </div>
      {children}
    </button>
  )
}

export default SideBarBtnUI