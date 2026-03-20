import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AchievementsPage from './pages/AchievementsPage/AchievementsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import DiscordCallback from './components/DiscordCallback/DiscordCallback'
import TreeOwlPage from './pages/TreeOwlPage/TreeOwlPage'
import PrivateRoute from './components/Auth/PrivateRoute'

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
    // Обертка для всех защищенных путей
    element: <PrivateRoute />, 
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/my', element: <ProfilePage /> },
      { path: '/myOwl', element: <ProfilePage /> },
      { path: '/achievements', element: <AchievementsPage /> },
      { path: '/tree', element: <TreeOwlPage /> },
      { path: '/myСharacters', element: <TreeOwlPage /> },
      { path: '/events', element: <TreeOwlPage /> },
      { path: '/settings', element: <TreeOwlPage /> },
    ]
  },
  {
    path: '/auth/discord/callback', 
    element: <DiscordCallback />,
  },
]);