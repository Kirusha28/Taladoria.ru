import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
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
    path: '/main',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/profile',
    element: <Navigate to={'/home'} />,
  },
  {
    path: '/achievements',
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