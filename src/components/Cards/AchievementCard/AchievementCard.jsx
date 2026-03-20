import React from 'react'
import './AchievementCard.scss'

const AchievementCard = ({ card, mode='full' }) => {
  
  return (
    <div className='AchievementCard' style={{
      width: mode == 'full' ? '170px' : '143px',
      height: mode == 'full' ? '270px' : '143px',
    }}>
      <div className='AchievementCard__img'>
        <img src={`./assets/achievements/${card.imgPath}`} alt={card.imgPath} />
      </div>
      {mode !== 'minimal' && <div className='AchievementCard__content'
        style={{ 
          backgroundColor: card?.status?.color+'33',
          border: '2px solid ' + card?.status?.color,
        }}
      >
        <h2 style={{color: card?.status?.color}}>{card.name}</h2>
        <p style={{color: card?.status?.color}}>{card.description}</p>
        <div className='AchievementCard__content__date'>
          <span style={{color: card?.status?.color, border: '1px solid ' + card?.status?.color}}>
            {card.obtained_at ? new Date(card.obtained_at).toLocaleDateString() : 'Никогда'}
          </span>
        </div>
      </div>}
    </div>
  )
}

export default AchievementCard