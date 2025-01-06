import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

export const routerDeleverItems = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/login',
    element: <Navigate to={'/home'} />,
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
    element: <Navigate to={'/home'} />,
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
]);