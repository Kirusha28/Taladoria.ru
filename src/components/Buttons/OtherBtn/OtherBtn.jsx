import React from 'react'
import './OtherBtn.scss'

import { ReactComponent as OtherIcon } from '../../../assets/svg/sidebar/otherIcon.svg'

const OtherBtn = ({ sx={}, onClick=() => {}, children}) => {
  return (
    <button className='OtherBtn' style={sx} onClick={onClick}>
      {children ? children : <OtherIcon width={'100%'} height={'100%'}/>}
    </button>
  )
}

export default OtherBtn