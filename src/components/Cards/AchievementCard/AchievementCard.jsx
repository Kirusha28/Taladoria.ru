import React from 'react'
import './AchievementCard.scss'

const AchievementCard = ({ card }) => {
  return (
    <div className='AchievementCard' >
      <div className='AchievementCard__img'>
        <img src={card.img} alt="" />
      </div>
      <div className='AchievementCard__content'
        style={{ 
          backgroundColor: card.backgroundColor,
          border: '2px solid ' + card.borderColor,
        }}
      >
        <h2>{card.title}</h2>
        <p style={{color: card.textColor}}>{card.description}</p>
        <div className='AchievementCard__content__date'>
          <span style={{color: card.textColor, border: '1px solid ' + card.borderColor}}>{card.date}</span>
        </div>
      </div>
    </div>
  )
}

export default AchievementCard