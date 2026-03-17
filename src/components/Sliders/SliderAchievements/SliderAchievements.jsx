import React, { useEffect, useState } from 'react'
import './SliderAchievements.scss'

import { ReactComponent as ArrowIcon } from '../../../assets/svg/slider/arrowIcon.svg'
import { useSelector } from 'react-redux';

const SliderAchievements = () => {
  const userAchievements = useSelector(state => state.accountData).achievements;

  const [countSliderItems, setCountSliderItems] = useState(0)
  const [silderPos, setSilderPos] = useState(0)

  useEffect(() => {
    const widdisp = document.querySelector('.SliderAchievements__slider__display')
    setCountSliderItems(Math.floor(widdisp?.getBoundingClientRect()?.width/110))
  }, [silderPos]);

  function DynamicImage({ imageName }) {
    return <img src={`./assets/achievements/${imageName}`} alt={imageName} />;
  }

  return (
    <div className='SliderAchievements'>
      <h2>Последние достижения <img src={'../../../assets/png/achievements/1.png'} alt="" /></h2>
      
      <div className='SliderAchievements__slider'>
        <button className='SliderAchievements__slider__back' 
          style={{opacity: silderPos > 0 ? 1 : 0.5}}
          onClick={() => {
            if (silderPos > 0) {setSilderPos(silderPos-1)}
          }}>
          <ArrowIcon height={'24px'}/>
        </button>
        <div className='SliderAchievements__slider__display'>
          {userAchievements?.slice(silderPos,silderPos+countSliderItems)?.map((item, index) => 
          <div className='SliderAchievements__slider__display__item' key={index}>
            <DynamicImage imageName={item.imgPath} />
          </div>)}
        </div>
        <button className='SliderAchievements__slider__next' 
          style={{opacity: silderPos < userAchievements?.length-countSliderItems ? 1 : 0.5}}
          onClick={() => {
            if (silderPos < userAchievements?.length-countSliderItems) {setSilderPos(silderPos+1)}
          }}>
          <ArrowIcon height={'24px'} style={{transform: 'rotate(180deg)'}}/>
        </button>
      </div>
    </div>
  )
}

export default SliderAchievements