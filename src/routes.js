import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AchievementsPage from './pages/AchievementsPage/AchievementsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import DiscordCallback from './components/DiscordCallback/DiscordCallback'

export const routerDeleverItems = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={'/login'} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/achievements',
    element: <AchievementsPage />,
  },
  {
    path: '/stats',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/myСharacters',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/events',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/settings',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/auth/discord/callback', 
    element: <DiscordCallback />,
  },
]);