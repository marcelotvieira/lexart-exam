import { message } from 'antd';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';
import { signin } from '../actions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('authToken'));
  const [messageApi, holder] = message.useMessage()
  const [authLoading, setAuthLoading] = useState(false)

  const login = async (payload) => {
    const user = await signin(payload)
    const jsonData = await user.json()
    setAuthLoading(false)
    if (!user.ok) return messageApi.open({
      type: 'error',
      content: jsonData.details
    })
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
      messageApi,
      authLoading,
      setAuthLoading,
    }}>
      {holder}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
