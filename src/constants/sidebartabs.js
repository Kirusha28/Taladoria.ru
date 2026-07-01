import React from 'react'
import { ReactComponent as HomeIcon } from '../assets/svg/sidebar/homeNavIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/sidebar/profileNavIcon.svg'
import { ReactComponent as MainProfileIcon } from '../assets/svg/sidebar/MainProfileIcon.svg'
import { ReactComponent as MyOwlIcon } from '../assets/svg/sidebar/MyOwlIcon.svg'
import { ReactComponent as OwlTreeIcon } from '../assets/svg/sidebar/OwlTreeIcon.svg'
import { ReactComponent as MyAchievmentsIcon } from '../assets/svg/sidebar/myAchivments.svg'
import { ReactComponent as AllAchievmentsIcon } from '../assets/svg/sidebar/allAchivments.svg'
import { ReactComponent as MyCharacterIcon } from '../assets/svg/sidebar/myCharacterNavIcon.svg'
import { ReactComponent as EventsIcon } from '../assets/svg/sidebar/eventsNavIcon.svg'
import { ReactComponent as MiniGamesIcon } from '../assets/svg/sidebar/miniGamesNavIcon.svg'

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
        title: 'Мои достижения',
        path: '/myAchievements',
        icon: MyAchievmentsIcon,
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
    title: 'Все достижения',
    path: '/achievements',
    icon: AllAchievmentsIcon,
    minitabs: [],
  },
  // {
  //   title: 'Flappy Owl',
  //   path: '/flappyOwl',
  //   icon: EventsIcon,
  //   minitabs: [],
  // },
  // {
  //   title: 'Мероприятия',
  //   path: '/events',
  //   icon: EventsIcon,
  //   minitabs: [],
  // },
  {
    title: 'Мини-игры',
    path: '/miniGames',
    icon: MiniGamesIcon,
    minitabs: [],
  },
]

export default sidebartabs
