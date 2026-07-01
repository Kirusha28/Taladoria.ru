import React from 'react'
import './AchievementCard.scss'

const AchievementCard = ({ card, mode = 'full', index = 0 }) => {
  const accent = card?.status?.color || '#FF720D'
  const isObtained = Boolean(card?.obtained_at)
  const metaLabel = card?.obtained_at
    ? new Date(card.obtained_at).toLocaleDateString()
    : `Есть у ${card?.usersCount ?? 0}`

  return (
    <article
      className={[
        'AchievementCard',
        `AchievementCard--${mode}`,
        isObtained ? 'AchievementCard--obtained' : 'AchievementCard--catalog',
      ].join(' ')}
      style={{
        '--accent': accent,
        '--accent-soft': `${accent}28`,
        '--accent-medium': `${accent}55`,
        '--delay': `${Math.min(index * 0.07, 0.84)}s`,
      }}
    >
      <div className='AchievementCard__frame'>
        <div className='AchievementCard__glow' aria-hidden='true' />
        <div className='AchievementCard__sparkles' aria-hidden='true'>
          <span /><span /><span />
        </div>

        <div className='AchievementCard__media'>
          <div className='AchievementCard__shine' aria-hidden='true' />
          <img
            src={`./assets/achievements/${card.imgPath}`}
            alt={card.name || card.imgPath}
            loading='lazy'
          />
          <span className='AchievementCard__meta'>{metaLabel}</span>
          {card?.status?.name && (
            <span className='AchievementCard__rarity'>{card.status.name}</span>
          )}
        </div>

        {mode !== 'minimal' && (
          <div className='AchievementCard__body'>
            <h2 className='AchievementCard__title'>{card.name}</h2>
            <p className='AchievementCard__description'>{card.description}</p>
          </div>
        )}

        {mode === 'minimal' && (
          <div className='AchievementCard__minimal-overlay'>
            <h2 className='AchievementCard__title'>{card.name}</h2>
          </div>
        )}
      </div>
    </article>
  )
}

export default AchievementCard
