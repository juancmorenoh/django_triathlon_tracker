import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// useAuth() is used inside the component to access the states
//It grabs the state
export const useAuth = () => useContext(AuthContext);

// The provider is what Wraps the components that need the state
//It provide the state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Boolean(localStorage.getItem('access'));
      setIsAuthenticated(token ? true : false);
  
  },[]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};