import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom'; // Добавили Outlet
import { useAuth } from './AuthProvider'; 

const PrivateRoute = () => { // children больше не нужен
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;