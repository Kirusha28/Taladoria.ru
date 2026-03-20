import React from 'react'
import { ReactComponent as HomeIcon } from '../assets/svg/sidebar/homeNavIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/sidebar/profileNavIcon.svg'
import { ReactComponent as MainProfileIcon } from '../assets/svg/sidebar/MainProfileIcon.svg'
import { ReactComponent as OwlTreeIcon } from '../assets/svg/sidebar/OwlTreeIcon.svg'
import { ReactComponent as AchievementsIcon } from '../assets/svg/sidebar/achievementsNavIcon.svg'
import { ReactComponent as StatsIcon } from '../assets/svg/sidebar/statsNavIcon.svg'
import { ReactComponent as MyCharacterIcon } from '../assets/svg/sidebar/myCharacterNavIcon.svg'
import { ReactComponent as EventsIcon } from '../assets/svg/sidebar/eventsNavIcon.svg'

const sidebartabs = [
  {
    title: 'Главная',
    path: '/home',
    icon: HomeIcon,
    minitabs: [],
  },
  {
    title: 'Профиль',
    path: '/profile',
    icon: MainProfileIcon,
    minitabs: [
      {
        title: 'Обо мне',
        path: '/my',
        icon: ProfileIcon,
      },
      {
        title: 'Моя сова',
        path: '/myOwl',
        icon: ProfileIcon,
      },
      {
        title: 'Достижения',
        path: '/achievements',
        icon: AchievementsIcon,
      },
    ],
  },

  {
    title: 'Совиное древо',
    path: '/tree',
    icon: OwlTreeIcon,
    minitabs: [],
  },
  {
    title: 'Мероприятия',
    path: '/events',
    icon: EventsIcon,
    minitabs: [],
  },
]

export default sidebartabs
