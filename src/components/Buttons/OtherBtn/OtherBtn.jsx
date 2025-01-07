import React from 'react'
import './OtherBtn.scss'

import { ReactComponent as OtherIcon } from '../../../assets/svg/sidebar/otherIcon.svg'

const OtherBtn = () => {
  return (
    <button className='OtherBtn'>
      <OtherIcon width={'25px'} height={'25px'}/>
    </button>
  )
}

export default OtherBtn