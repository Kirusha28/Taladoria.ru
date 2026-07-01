import React from 'react'
import './AchievementCard.scss'
import { useImageLightbox } from '../../ImageLightbox/ImageLightbox'

const AchievementCard = ({ card, mode = 'full', index = 0 }) => {
  const { openLightbox } = useImageLightbox()
  const accent = card?.status?.color || '#FF720D'
  const isObtained = Boolean(card?.obtained_at)
  const imageSrc = `./assets/achievements/${card.imgPath}`
  const metaLabel = card?.obtained_at
    ? new Date(card.obtained_at).toLocaleDateString()
    : `Есть у ${card?.usersCount ?? 0}`

  const handleImageOpen = () => {
    openLightbox({
      src: imageSrc,
      alt: card.name || card.imgPath,
      caption: card.name,
    })
  }

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

        <button
          type='button'
          className='AchievementCard__media'
          onClick={handleImageOpen}
          aria-label={`Открыть достижение ${card.name || ''}`}
        >
          <div className='AchievementCard__shine' aria-hidden='true' />
          <img
            src={imageSrc}
            alt={card.name || card.imgPath}
            loading='lazy'
          />
          <span className='AchievementCard__meta'>{metaLabel}</span>
          {card?.status?.name && (
            <span className='AchievementCard__rarity'>{card.status.name}</span>
          )}
        </button>

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
