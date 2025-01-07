import React, { useEffect, useState } from 'react'
import './SliderAchievements.scss'

import { ReactComponent as ArrowIcon } from '../../../assets/svg/slider/arrowIcon.svg'

const SliderAchievements = () => {
  const achievements = [1,2,3,4,5,6,7,8,9]

  const [countSliderItems, setCountSliderItems] = useState(0)
  const [silderPos, setSilderPos] = useState(0)

  useEffect(() => {
    const widdisp = document.querySelector('.SliderAchievements__slider__display')
    setCountSliderItems(Math.floor(widdisp?.getBoundingClientRect()?.width/110))
  }, [silderPos]);



  return (
    <div className='SliderAchievements'>
      <h2>Последние достижения</h2>
      <div className='SliderAchievements__slider'>
        <div className='SliderAchievements__slider__back' 
          style={{opacity: silderPos > 0 ? 1 : 0.5}}
          onClick={() => {
            if (silderPos > 0) {setSilderPos(silderPos-1)}
          }}>
          <ArrowIcon height={'24px'}/>
        </div>
        <div className='SliderAchievements__slider__display'>
          {achievements.slice(silderPos,silderPos+countSliderItems).map((item, index) => 
          <div className='SliderAchievements__slider__display__item' key={index}>
            {}
          </div>)}
        </div>
        <div className='SliderAchievements__slider__next' 
          style={{opacity: silderPos < achievements.length-countSliderItems ? 1 : 0.5}}
          onClick={() => {
            if (silderPos < achievements.length-countSliderItems) {setSilderPos(silderPos+1)}
          }}>
          <ArrowIcon height={'24px'} style={{transform: 'rotate(180deg)'}}/>
        </div>
      </div>
    </div>
  )
}

export default SliderAchievements