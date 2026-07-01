import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './ImageLightbox.scss'

const ImageLightboxContext = createContext(null)

export const ImageLightboxProvider = ({ children }) => {
  const [view, setView] = useState(null)

  const openLightbox = useCallback(({ src, alt = '', caption = '' }) => {
    if (!src) return
    setView({ src, alt, caption })
  }, [])

  const closeLightbox = useCallback(() => setView(null), [])

  useEffect(() => {
    if (!view) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [view, closeLightbox])

  return (
    <ImageLightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {view && ReactDOM.createPortal(
        <div
          className='ImageLightbox'
          onClick={closeLightbox}
          role='dialog'
          aria-modal='true'
          aria-label={view.alt || 'Просмотр изображения'}
        >
          <button
            type='button'
            className='ImageLightbox__close'
            onClick={closeLightbox}
            aria-label='Закрыть'
          >
            ×
          </button>
          <div className='ImageLightbox__content' onClick={(event) => event.stopPropagation()}>
            <img src={view.src} alt={view.alt} className='ImageLightbox__image' />
            {view.caption && <p className='ImageLightbox__caption'>{view.caption}</p>}
          </div>
        </div>,
        document.body
      )}
    </ImageLightboxContext.Provider>
  )
}

export const useImageLightbox = () => {
  const context = useContext(ImageLightboxContext)
  if (!context) {
    throw new Error('useImageLightbox must be used within ImageLightboxProvider')
  }
  return context
}

export const LightboxImage = ({
  src,
  alt = '',
  caption = '',
  className = '',
  onClick,
  ...props
}) => {
  const { openLightbox } = useImageLightbox()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || !src) return
    openLightbox({ src, alt, caption: caption || alt })
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={`LightboxImage ${className}`.trim()}
      onClick={handleClick}
    />
  )
}

export default ImageLightboxProvider
