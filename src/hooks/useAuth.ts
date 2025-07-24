import { useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  username: string;
  token: string;
}

export const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userToken: string) => {
    localStorage.setItem('authToken', userToken);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return {
    token,
    isAuthenticated,
    login,
    logout
  };
};