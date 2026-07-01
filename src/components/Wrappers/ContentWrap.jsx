import React from 'react'
import './ContentWrap.scss'

const ContentWrap = ({children, sx={}, title='', active=false, fluid=false}) => {
  const className = [
    active ? 'ContentWrap__active' : 'ContentWrap',
    fluid ? 'ContentWrap--fluid' : '',
  ].filter(Boolean).join(' ')

  return (
    <div 
      className={className}
      title={title}
      style={sx}
    >
      {children}
    </div>
  )
}

export default ContentWrap