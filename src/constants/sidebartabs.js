import React from 'react'
import { ReactComponent as HomeIcon } from '../assets/svg/sidebar/homeNavIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/sidebar/profileNavIcon.svg'
import { ReactComponent as AchievementsIcon } from '../assets/svg/sidebar/achievementsNavIcon.svg'
import { ReactComponent as StatsIcon } from '../assets/svg/sidebar/statsNavIcon.svg'
import { ReactComponent as MyCharacterIcon } from '../assets/svg/sidebar/myCharacterNavIcon.svg'
import { ReactComponent as EventsIcon } from '../assets/svg/sidebar/eventsNavIcon.svg'

const sidebartabs = [
  {
    title: 'Главная',
    path: '/home',
    icon: HomeIcon,
  },
  {
    title: 'Профиль',
    path: '/profile',
    icon: ProfileIcon,
  },
  {
    title: 'Достижения',
    path: '/achievements',
    icon: AchievementsIcon,
  },
  {
    title: 'Статистика',
    path: '/stats',
    icon: StatsIcon,
  },
  {
    title: 'Мои персонажи',
    path: '/myСharacters',
    icon: MyCharacterIcon,
  },
  {
    title: 'Мероприятия',
    path: '/events',
    icon: EventsIcon,
  },
]

export default sidebartabs