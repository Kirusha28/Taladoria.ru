import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.accountData);

  const value = {
    isAuthenticated: !!user?.loggedIn,
    user: user,
    isLoading: user?.status === 'loading' // если добавили статус
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context || {}; 
};

export default AuthProvider;