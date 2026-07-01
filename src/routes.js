import { createBrowserRouter, Navigate, redirect } from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AchievementsPage from './pages/AchievementsPage/AchievementsPage'
import LoginPage from './pages/LoginPage/LoginPage'
import DiscordCallback from './components/DiscordCallback/DiscordCallback'
import TreeOwlPage from './pages/TreeOwlPage/TreeOwlPage'
import PrivateRoute from './components/Auth/PrivateRoute'
import FlappyOwlPage from './pages/FlappyOwlPage/FlappyOwlPage'
import MyAchievementsPage from './pages/MyAchievementsPage/MyAchievementsPage'
import EventPage from './pages/EventPage/EventPage'
import UserPage from './pages/UserPage/UserPage'
import MiniGamesPage from './pages/MiniGamesPage/MiniGamesPage'

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
      { path: '/profile', element: <Navigate to={'/my'} /> },
      { path: '/profile/:id', element: <UserPage /> },
      { path: '/my', element: <ProfilePage /> },
      { path: '/myAchievements', element: <MyAchievementsPage /> },
      { path: '/achievements', element: <AchievementsPage /> },
      { path: '/tree', element: <TreeOwlPage /> },
      { path: '/myСharacters', element: <TreeOwlPage /> },
      // { path: '/events', element: <EventPage /> },
      { path: '/miniGames', element: <MiniGamesPage /> },
      { path: '/settings', element: <TreeOwlPage /> },
      { path: '/flappyOwl', element: <FlappyOwlPage /> },
    ]
  },
  {
    path: '/auth/discord/callback', 
    element: <DiscordCallback />,
  },
  {
    path: '/api/auth/discord/callback',
    loader: ({ request }) => {
      const search = new URL(request.url).search
      return redirect(`/auth/discord/callback${search}`)
    },
  },
]);