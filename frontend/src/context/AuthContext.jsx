import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// 1. Context Create Karna
const AuthContext = createContext();

// Custom hook taaki components easily state access kar sakein
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. App load hote hi local storage se user check karna
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 3. Login Function (Service ko call karta hai)
  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user); // State update
    return data;
  };

  // 4. Logout Function
  const logout = async () => {
    await authService.logout();
    setUser(null); // State clear
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};