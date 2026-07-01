import React from 'react'
import './MiniGamesContent.scss'

const SPLASH_ART = String.raw`:)\____/(:
{(@)v(@)
{|~- -~|}
{/^'^'^\}
══m-m══`

const MiniGamesContent = () => {
  return (
    <section className='MiniGamesContent'>
      <pre className='MiniGamesContent__art' aria-hidden='true'>
        {SPLASH_ART}
      </pre>
      <p className='MiniGamesContent__caption'>В разработке... Уву?</p>
    </section>
  )
}

export default MiniGamesContent
