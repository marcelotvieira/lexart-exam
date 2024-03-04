import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';
import { signin } from '../actions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));
  const [authErr, setAuthErr] = useState(null)


  const login = async (payload) => {
    const user = await signin(payload)
    const jsonData = await user.json()
    if (!user.ok) return setAuthErr(jsonData.details)
    Cookies.set('authToken', jsonData.token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      authErr,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
