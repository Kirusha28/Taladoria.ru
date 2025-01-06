import React from 'react'
import './DisplayGrowth.scss'

import { ReactComponent as IncreaseIcon } from '../../../assets/svg/dispGrowth/increaseIcon.svg'
import { ReactComponent as DecreaseIcon } from '../../../assets/svg/dispGrowth/decreaseIcon.svg'

const DisplayGrowth = ({ percent }) => {
  return (
    percent >= 0 ?
    <div className='DisplayGrowth__increase'>
      <IncreaseIcon width={'14px'} height={'14px'}/>
      {percent.toFixed(1)}%
    </div> :
    <div className='DisplayGrowth__decrease'>
      <DecreaseIcon width={'14px'} height={'14px'}/>
      {Math.abs(percent).toFixed(1)}%
    </div>
  )
}

export default DisplayGrowth