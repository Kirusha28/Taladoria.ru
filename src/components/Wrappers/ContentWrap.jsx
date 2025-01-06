import React from 'react'
import './ContentWrap.scss'

const ContentWrap = ({children, sx={}, title='', active=false}) => {
  return (
    <div 
      className={'ContentWrap'+ (active ? '__active' : '')}
      title={title}
      style={sx}
    >
      {children}
    </div>
  )
}

export default ContentWrap